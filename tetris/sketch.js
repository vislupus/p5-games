const TETRIS_ROWS = 20;
const TETRIS_COLS = 10;
const TETRIS_SIZE = 29;
const tetrisTable = [];
let game = true;
let fall = true;
let currentFig = {
    obj: {},
    row: 0,
    col: 0
};

function setup() {
    createCanvas(600, 600);
    frameRate(2);

    createArray();
    newFig();

    //                        for (let i = 0; i < TETRIS_COLS; i++) {
    //                            for (let j = 1; j < TETRIS_ROWS - 15; j++) {
    //                                tetrisTable[TETRIS_ROWS - j][i] = 1;
    //                            }
    //                        }
}

function draw() {
    background(50);

    drawLines();
    drawFieldElements();

    if (game) {
        drawCurrentFig();

        if (fall) {
            if (currentFig.row >= -TETRIS_SIZE) {
                checkNext();
            }

            currentFig.row += TETRIS_SIZE;
        }

        fall = true;
    }
}

function keyPressed() {
    //            console.log(keyCode)
    if (keyCode === 81) {
        currentFig.obj.cells = getLeftRotation(currentFig.obj.cells);
    } else if (keyCode === 69) {
        currentFig.obj.cells = getRightRotation(currentFig.obj.cells);
    } else if (keyCode === DOWN_ARROW) {
        if (fall) {
            currentFig.row += TETRIS_SIZE * 2;
        }

    } else if (keyCode === LEFT_ARROW) {
        if (((currentFig.col - TETRIS_SIZE) / TETRIS_SIZE) >= 0) {
            //                    console.log("Left")
            currentFig.col -= TETRIS_SIZE;
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (((currentFig.col / TETRIS_SIZE) + currentFig.obj.cells[0].length - 1) <= TETRIS_COLS - 2) {
            //                    console.log("Right")
            currentFig.col += TETRIS_SIZE;
        }
    }
}
