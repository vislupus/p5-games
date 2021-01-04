function createArray() {
    for (let i = 0; i < TETRIS_ROWS; i++) {
        tetrisTable.push([]);
        for (let j = 0; j < TETRIS_COLS; j++) {
            tetrisTable[i].push(0);
        }
    }
}

function drawLines() {
    noFill();
    stroke(255);
    for (let i = 0; i <= TETRIS_ROWS; i += 1) {
        line(0, TETRIS_SIZE * i, TETRIS_COLS * TETRIS_SIZE, TETRIS_SIZE * i);
    }

    for (let i = 0; i <= TETRIS_COLS; i += 1) {
        line(TETRIS_SIZE * i, 0, TETRIS_SIZE * i, TETRIS_ROWS * TETRIS_SIZE);
    }
}

function newFig() {
    if (game) {
        //        console.log("new")
        const index = floor(random(figures.length));
        currentFig.obj = figures[index];
        currentFig.row = -TETRIS_SIZE * 2;
        currentFig.col = 4 * TETRIS_SIZE;
    }
}

function drawCurrentFig() {
    for (let i = 0; i < currentFig.obj.cells.length; i++) {
        for (let j = 0; j < currentFig.obj.cells[i].length; j++) {
            if (currentFig.obj.cells[i][j] != 0) {
                fill(currentFig.obj.color);
                rect(TETRIS_SIZE * j + currentFig.col, TETRIS_SIZE * i + currentFig.row, TETRIS_SIZE);
            }
        }
    }
}

function drawFieldElements() {
    for (let i = 0; i < TETRIS_ROWS; i++) {
        for (let j = 0; j < TETRIS_COLS; j++) {
            if (tetrisTable[i][j] != 0) {
                if (tetrisTable[i][j] == 1) {
                    fill("green");
                } else if (tetrisTable[i][j] == 2) {
                    fill("blue");
                } else if (tetrisTable[i][j] == 3) {
                    fill("coral");
                } else if (tetrisTable[i][j] == 4) {
                    fill("gold");
                } else if (tetrisTable[i][j] == 5) {
                    fill("chocolate");
                } else if (tetrisTable[i][j] == 6) {
                    fill("darkgreen");
                } else if (tetrisTable[i][j] == 7) {
                    fill("blueviolet");
                } else if (tetrisTable[i][j] == 8) {
                    fill("purple");
                }

                rect(TETRIS_SIZE * j, TETRIS_SIZE * i, TETRIS_SIZE);
            }

            //            textSize(16);
            //            textAlign(CENTER, CENTER);
            //            fill(255);
            //            text(i, TETRIS_SIZE * j + TETRIS_SIZE / 2, TETRIS_SIZE * i + TETRIS_SIZE / 2);
        }
    }
}

function getLeftRotation(matrix) {
    const rotated = [];
    const rows = matrix[0].length;
    const cols = matrix.length;

    for (let i = 0; i < rows; i += 1) {
        const row = []

        for (let j = 0; j < cols; j += 1) {
            row.push(matrix[j][rows - 1 - i]);
        }

        rotated.push(row);
    }

    return rotated;
}

function getRightRotation(matrix) {
    const rotated = [];
    const rows = matrix[0].length;
    const cols = matrix.length;

    for (let i = 0; i < rows; i += 1) {
        const row = []

        for (let j = 0; j < cols; j += 1) {
            row.push(matrix[cols - 1 - j][i]);
        }

        rotated.push(row);
    }

    return rotated;
}


function addToTable() {
    for (let i = 0; i < currentFig.obj.cells.length; i++) {
        for (let j = 0; j < currentFig.obj.cells[i].length; j++) {
            if (currentFig.obj.cells[i][j] != 0) {
                let col = (currentFig.col / TETRIS_SIZE) + j;
                let row = (currentFig.row + TETRIS_SIZE * i) / TETRIS_SIZE;

                if (row < 0) {
                    game = false;
                    //                            console.log("game over!")
                } else {
                    tetrisTable[row][col] = currentFig.obj.cells[i][j];
                    //                        console.log(tetrisTable)
                }
            }
        }
    }
}

function checkNext() {
    const filledRows = [];

    for (let i = 0; i < currentFig.obj.cells.length; i++) {
        for (let j = 0; j < currentFig.obj.cells[i].length; j++) {
            if (currentFig.obj.cells[i][j] != 0) {
                let col = (currentFig.col / TETRIS_SIZE) + j;
                let row = floor((currentFig.row + TETRIS_SIZE * i) / TETRIS_SIZE);
                //                        console.log(col + " | " + row)
                //                    console.log(i)

                if (row >= TETRIS_ROWS - 1) {
                    fall = false;

                    //                            console.log('break screen')
                    addToTable();

                    //                            const isRowFilled = tetrisTable[row].every(x => x);
                    //                            if (isRowFilled) {
                    //                                filledRows.push(row);
                    //                            }
                    //
                    //                            for (const row of filledRows) {
                    //                                tetrisTable.splice(row, 1);
                    //                                const emptyRow = Array.from({
                    //                                    length: TETRIS_COLS
                    //                                });
                    //                                tetrisTable.unshift(emptyRow);
                    //                            }

                    moveRows();

                    newFig();

                    break;
                } else if (tetrisTable[row + 1][col] != 0) {
                    fall = false;

                    //                            console.log('break')
                    addToTable();

                    moveRows();

                    newFig();

                    break;
                }
            }
        }
    }
}

function moveRows() {
    const n = [];
    for (let i = 0; i < TETRIS_ROWS; i++) {
        if (!tetrisTable[i].includes(0)) {
            n.push(i)
        }
    }

    for (let i of n) {
        let data = new Array(TETRIS_COLS);

        for (let i = 0; i < data.length; i++) {
            data[i] = 0;
        }

        tetrisTable[i] = data;

        //                console.log(i)

        for (let j = i; j > 0; j--) {
            let temp = tetrisTable[j];
            tetrisTable[j] = data;
            tetrisTable[j + 1] = temp;
        }
    }
}