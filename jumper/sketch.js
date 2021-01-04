let scl = 60;
let canvasW = 900;
let canvasH = 600;
let cols = parseInt(canvasW / scl);
let rows = parseInt(canvasH / scl);
let total = cols * rows;
let ball;
let bricks = [];
let jump = false;

let grid = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];

function setup() {
    createCanvas(canvasW, canvasH);

    ball = new Ball((95 % cols) * scl + scl, parseInt(95 / cols) * scl + scl, 5);

    for (let i = 0; i < total; i++) {
        if (grid[i] === 1) {
            bricks.push(new Bricks(i));
        }
    }
}

function draw() {
    background(50);

    ball.update();
    ball.show();

    for (let [i, b] of bricks.entries()) {
        b.update(ball, i);
        b.show();
    }
}

function keyPressed() {
    console.log(keyCode)
    if (keyCode === UP_ARROW || keyCode === 32) {
        if (ball.onGround) {
            ball.dir(0, -20);
            ball.onGround = false;
            jump = true;
        }
    } else if (keyCode === LEFT_ARROW) {
        if (!jump) {
            ball.dir(-6, 0);
        }
    } else if (keyCode === 65) {
        if (ball.onGround) {
            ball.dir(-6, -20);
            ball.onGround = false;
            jump = true;
        }
    } else if (keyCode === 90) {
        if (ball.onGround) {
            ball.dir(-20, -30);
            ball.onGround = false;
            jump = true;
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (!jump) {
            ball.dir(6, 0);
        }
    } else if (keyCode === 68) {
        if (ball.onGround) {
            ball.dir(6, -20);
            ball.onGround = false;
            jump = true;
        }
    } else if (keyCode === 67) {
        if (ball.onGround) {
            ball.dir(20, -30);
            ball.onGround = false;
            jump = true;
        }
    }
}



function mousePressed() {
    ball.pos.x = mouseX;
    ball.pos.y = mouseY;
    ball.vel.x = 0;
    ball.vel.y = 0;
    ball.acc.x = 0;
    ball.acc.y = 0;
    ball.onGround = true;
}

function mouseDragged() {
    ball.pos.x = mouseX;
    ball.pos.y = mouseY;
}

function mouseReleased() {
    ball.vel.x = 0;
    ball.vel.y = -2;
    ball.onGround = false;
}

//        function mousePressed() {
//            for (let b of bricks) {
//                if (mouseX > b.x && mouseX < b.x + scl && mouseY > b.y && mouseY < b.y + scl) {
//                    console.log(b.id)
//                }
//            }
//        }
