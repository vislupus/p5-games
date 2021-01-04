let ball = {};
let paddle = {};
let bricks = [];
let n = 0;

function setup() {
    createCanvas(800, 600);

    ball = new Ball();
    paddle = new Paddle();
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 10; i++) {
            bricks.push(new Bricks(i * 80 + 40, j * 45 + 100, 75, 40));
        }
    }
}

function draw() {
    background(0);

    ball.update();
    ball.show();
    ball.edge(paddle);

    paddle.update();
    paddle.show();

    for (let [i, b] of bricks.entries()) {
        b.update(ball, i);
        b.show(i);
    }

    n = 0;
}

//        function mousePressed() {
//            ball.pos.x = mouseX;
//            ball.pos.y = mouseY;
//            ball.vel.x = 0;
//            ball.vel.y = 0;
//        }
//
//        function mouseDragged() {
//            ball.pos.x = mouseX;
//            ball.pos.y = mouseY;
//        }
//
//        function mouseReleased() {
//            ball.vel.x = 2;
//            ball.vel.y = -2;
//        }
