 const scl = 60;
 const canvasW = 900;
 const canvasH = 600;
 const cols = parseInt(canvasW / scl);
 const rows = parseInt(canvasH / scl);
 const total = cols * rows;
 const bricks = [];
 let group = [];
 let toCheck = [];
 let lastDis = 0;

 function setup() {
     createCanvas(canvasW, canvasH);

     for (let i = 0; i < total; i++) {
         bricks.push(new Bricks(i, floor(random(0, 3))));
     }
 }

 function draw() {
     background(100);

     for (let [i, b] of bricks.entries()) {
         show(b);
     }
 }

 function show(b) {
     if (!b.disable) {
         stroke(255);
         strokeWeight(2);
         fill(b.color);
         rect(b.x, b.y, scl);


         //                fill(255);
         //                noStroke();
         //                textSize(14);
         //                textAlign(CENTER, CENTER);
         //                text(b.id, b.x + scl / 2, b.y + scl / 2);
         //                text(floor(b.y / scl), b.x + scl / 2, b.y + scl / 2);
         //                    text(floor(this.x / scl), this.x + scl / 2, this.y + scl / 2);
     }
 }

 function check(b) {
     if (b.id >= 1 && b.id % cols != 0) {
         if (bricks[b.id - 1].colorId == b.colorId) {

             addToCheck(b.id - 1);
         }
     }

     if (b.id < bricks.length - 1) {
         if (bricks[b.id + 1].colorId == b.colorId && b.id % cols != cols - 1) {

             addToCheck(b.id + 1);
         }
     }

     if (floor((b.id - cols) / cols) >= 0 && floor(bricks[b.id].y / scl) != 0) {
         if (bricks[b.id - cols].colorId == b.colorId) {

             addToCheck(b.id - cols);
         }
     }

     if (floor((b.id + cols) / cols) <= rows - 1 && floor(bricks[b.id].y / scl) != rows - 1) {
         if (bricks[b.id + cols].colorId == b.colorId) {

             addToCheck(b.id + cols);
         }
     }
 }

 function addToGroup(id) {
     group.push(id);
 }

 function addToCheck(id) {
     toCheck.push(id);
 }

 function checkNew() {
     for (let i = 0; i <= toCheck.length - 1; i++) {
         if (!group.includes(toCheck[i])) {
             addToGroup(toCheck[i]);

             check(bricks[toCheck[i]]);
         }
     }

     if (group.length > 1) {
         removeBricks();
     }

     moveCols();
     moveCols();
 }

 function reorder(arr, col) {
     let tempArr = arr;
     let n = tempArr.length - 1;

     for (let r = rows - 1; r >= 0; r--) {
         if (tempArr[n].y != r * scl) {
             tempArr[n].y = r * scl;
         }
         n--;
     }

     let m = 0;
     for (let i = 0; i <= bricks.length - 1; i++) {
         if (floor(bricks[i].x / scl) == col) {
             bricks[i] = tempArr[m];
             m++;
         }
     }

     for (let i = 0; i <= bricks.length - 1; i++) {
         if (bricks[i].id != i) {
             bricks[i].id = i;
         }

     }
 }

 function reorderCol(arr) {
     let tempArr = arr;
     let tempRow = [];

     for (let r = 0; r <= rows - 1; r++) {
         for (let i = 0; i <= bricks.length - 1; i++) {
             if (floor(bricks[i].y / scl) == r) {
                 tempRow.push(Object.assign({}, bricks[i]));
             }
         }

         let n = 0;
         for (let i = 0; i <= tempRow.length - 1; i++) {
             if (tempArr[r].id == tempRow[i].id) {
                 n = i;
             }

         }

         let temp = Object.assign({}, tempRow[n]);
         let last = r * cols + (cols - 1);
         for (let i = n; i <= cols - 1; i++) {
             tempRow[i] = Object.assign({}, tempRow[i + 1]);
         }

         tempRow[cols - 1] = Object.assign({}, temp);

         let m = 0;
         for (let i = 0; i <= bricks.length - 1; i++) {
             if (floor(bricks[i].y / scl) == r) {
                 bricks[i] = tempRow[m];
                 m++;

             }
         }

         tempRow = [];
     }

     for (let i = 0; i <= bricks.length - 1; i++) {
         if (bricks[i].id != i) {
             bricks[i].id = i;
         }

     }

     for (let i = 0; i <= bricks.length - 1; i++) {
         bricks[i].x = (i % cols) * scl;
     }
 }

 function moveCols() {
     let col = [];
     let colDis = [];

     for (let c = 0; c <= cols - 1 - lastDis; c++) {
         for (let i = 0; i <= bricks.length - 1; i++) {
             if (floor(bricks[i].x / scl) == c) {
                 let copy = Object.assign({}, bricks[i]);
                 if (!bricks[i].disable) {
                     col.push(copy);
                 } else {
                     colDis.push(copy);
                 }
             }
         }

         if (col.length < 1) {
             reorderCol(colDis);
             lastDis++;
         }

         col = [];
         colDis = [];
     }
 }

 function removeBricks() {
     let col = [];
     let colDis = [];

     for (let i = 0; i <= group.length - 1; i++) {
         bricks[group[i]].disable = true;
     }

     for (let c = 0; c <= cols - 1 - lastDis; c++) {
         for (let i = 0; i <= bricks.length - 1; i++) {
             if (floor(bricks[i].x / scl) == c) {
                 let copy = Object.assign({}, bricks[i]);
                 if (!bricks[i].disable) {
                     col.push(copy);
                 } else {
                     colDis.push(copy);
                 }
             }
         }


         col = colDis.concat(col);
         reorder(col, c);

         col = [];
         colDis = [];
     }
 }

 function mousePressed() {
     group = [];
     toCheck = [];

     for (let b of bricks) {
         if (mouseX > b.x && mouseX < b.x + scl && mouseY > b.y && mouseY < b.y + scl) {
             addToGroup(b.id);
             show(b);
             check(b);
             checkNew();
         }
     }
 }

 class Bricks {
     constructor(id, colorID) {
         this.id = id;
         this.x = (this.id % cols) * scl;
         this.y = floor(this.id / cols) * scl;
         this.disable = false;
         this.colorId = colorID;

         if (this.colorId == 0) {
             this.color = color("#3366ff");
         } else if (this.colorId == 1) {
             this.color = color("#33cc33");
         } else if (this.colorId == 2) {
             this.color = color("#ff3333");
         } else if (this.colorId == 3) {
             this.color = color("#ffd633");
         }
     }
 }
