let snake;
let scl = 20;
let nFood = 25;
let food = [];

function setup() {
    createCanvas(900, 600);
    frameRate(5);

    snake = new Snake(parseInt((width / 2) / scl) * scl, parseInt((height / 2) / scl) * scl);

    for (let i = 0; i < nFood; i++) {
        food[i] = createVector(floor(random(width) / scl) * scl, floor(random(height) / scl) * scl);
    }
}

function draw() {
    background(20);

    //            stroke(255);
    //            for (let i = 0; i < width; i += scl) {
    //                line(i, 0, i, height);
    //            }
    //
    //            for (let j = 0; j < height; j += scl) {
    //                line(0, j, width, j);
    //            }

    fill(255, 0, 100);
    for (let i = 0; i < nFood; i++) {
        if (snake.eat(food[i])) {
            food[i] = createVector(floor(random(width) / scl) * scl, floor(random(height) / scl) * scl);
        }
        rect(food[i].x, food[i].y, scl);
    }

    snake.death();
    snake.update();
    snake.edges();
    snake.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (snake.vel.y != scl) {
            snake.dir(0, -1);
        }
    } else if (keyCode === DOWN_ARROW) {
        if (snake.vel.y != -scl) {
            snake.dir(0, 1);
        }
    } else if (keyCode === LEFT_ARROW) {
        if (snake.vel.x != scl) {
            snake.dir(-1, 0);
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (snake.vel.x != -scl) {
            snake.dir(1, 0);
        }
    }
}
