let scl = 60;
let canvasW = 900;
let canvasH = 600;
let cols = parseInt(canvasW / scl);
let rows = parseInt(canvasH / scl);
let total = cols * rows;
let heroID = 0;
let keys = 0;
let game = true;
// 1-wall
// 2-hero
// 3-door
// 4-key
// 5-end

let grid = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 4, 0, 1, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 4, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0, 0, 1,
            1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 0, 5, 0, 1, 0, 0, 1,
            1, 4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
            1, 4, 1, 0, 0, 4, 0, 1, 1, 3, 1, 1, 4, 0, 1,
            1, 3, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
            1, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];

function setup() {
    createCanvas(canvasW, canvasH);
    frameRate(5);
}

function draw() {
    background(50);

    stroke(255);
    for (let i = 0; i < width; i += scl) {
        line(i, 0, i, height);
    }

    for (let j = 0; j < height; j += scl) {
        line(0, j, width, j);
    }


    for (let i = 0; i < total; i++) {
        if (grid[i] === 1) {
            //                    wall
            fill(color("#993366"));
            rect((i % cols) * scl, parseInt(i / cols) * scl, scl);
        } else if (grid[i] === 2) {
            //                    hero
            fill(color("green"));
            ellipse((i % cols) * scl + scl / 2, parseInt(i / cols) * scl + scl / 2, scl - 15);

            let n = 0;
            for (let j = 0; j < 3; j++) {
                if (keys > 0 && n < keys) {
                    fill(color("#ff9900"));
                    n++;
                } else {
                    noFill();
                }

                ellipse((i % cols) * scl + 45 - 15 * j, parseInt(i / cols) * scl - 2, scl / 5);
            }


            heroID = i;
        } else if (grid[i] === 3) {
            //                    door
            fill(color("#804000"));
            rect((i % cols) * scl + scl / 4, parseInt(i / cols) * scl + scl / 4, scl / 2);
        } else if (grid[i] === 4) {
            //                    key
            fill(color("yellow"));
            triangle((i % cols) * scl + scl / 2, parseInt(i / cols) * scl + 10,
                (i % cols) * scl + 10, parseInt(i / cols) * scl + scl - 10,
                (i % cols) * scl + scl - 10, parseInt(i / cols) * scl + scl - 10)
        } else if (grid[i] === 5) {
            //                    cup
            fill(color("blue"));
            rect((i % cols) * scl, parseInt(i / cols) * scl, scl);
        }
    }

    if (!game) {
        fill(255);
        noStroke();
        textSize(100);
        textAlign(CENTER, CENTER);
        text("You Win!", width / 2, height / 2);
    }
}

function gridCahnge(newPos) {
    if (grid[newPos] === 0) {
        grid[heroID] = 0;
        grid[newPos] = 2;
    } else if (grid[newPos] === 4) {
        grid[heroID] = 0;
        grid[newPos] = 2;
        keys++;
    } else if (grid[newPos] === 3 && keys > 0) {
        grid[heroID] = 0;
        grid[newPos] = 2;
        keys--;
    } else if (grid[newPos] === 5) {
        grid[heroID] = 0;
        grid[newPos] = 2;

        game = false;
    }
}

function keyPressed() {
    let newPos = 0;
    if (keyCode === UP_ARROW) {
        newPos = heroID - cols;

        gridCahnge(newPos);

    } else if (keyCode === DOWN_ARROW) {
        newPos = heroID + cols;

        gridCahnge(newPos);
    } else if (keyCode === LEFT_ARROW) {
        newPos = heroID - 1;

        gridCahnge(newPos);
    } else if (keyCode === RIGHT_ARROW) {
        newPos = heroID + 1;

        gridCahnge(newPos);
    }
}
