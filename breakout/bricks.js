class Bricks {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.state = true;
        this.color = 150;
    }

    changeState(state) {
        this.state = state;
    }

    update(b, id) {
        let left = this.x - b.r / 2 - this.w / 2;
        let right = this.x + b.r / 2 + this.w / 2;
        let top = this.y - b.r / 2 - this.h / 2;
        let bottom = this.y + b.r / 2 + this.h / 2;

        if (b.pos.x > left &&
            b.pos.x < right &&
            b.pos.y > top &&
            b.pos.y < bottom &&
            this.state) {

            this.changeState(false);

            if (((b.pos.x < this.x - this.w / 2 + 20 && b.pos.x > this.x - this.w / 2 - 10) ||
                    (b.pos.x > this.x + this.w / 2 - 20 && b.pos.x < this.x + this.w / 2 + 10)) &&
                ((b.pos.y < this.y + this.h / 2 + 10 && b.pos.y > this.y + this.h / 2) ||
                    (b.pos.y > this.y - this.h / 2 - 10 && b.pos.y < this.y - this.h / 2))) {

                if (n == 0) {
                    //                            console.log('double')
                    b.vel.y *= -1;
                    n = 1;

                }
            } else {
                //                        console.log('normal')
                b.vel.y *= -1;
            }



            //                    console.log(b.pos.x, this.x - this.w / 2 + 10, this.x - this.w / 2 + 10)
            //                    console.log("left: ", b.pos.x < this.x - this.w / 2 + 10 && b.pos.x > this.x - this.w / 2 - 10)
            //
            //                    console.log(b.pos.y, this.y + this.h / 2 + 10, this.y + this.h / 2)
            //                    console.log("bottom: ", b.pos.y < this.y + this.h / 2 + 10 && b.pos.y > this.y + this.h / 2)
            //
            //                    console.log(b.pos.x, this.x + this.w / 2 - 10, this.x + this.w / 2 + 10)
            //                    console.log("right: ", b.pos.x > this.x + this.w / 2 - 10 && b.pos.x < this.x + this.w / 2 + 10)
            //
            //                    console.log(b.pos.y, this.y - this.h / 2 - 10, this.y - this.h / 2)
            //                    console.log("top: ", b.pos.y > this.y - this.h / 2 - 10 && b.pos.y < this.y - this.h / 2)

            let prevBallX = b.pos.x - b.vel.x;
            let prevBallY = b.pos.y - b.vel.y;

            let newTop = this.y - this.h / 2;
            let newLeft = this.x - this.w / 2;
            let newRight = this.x + this.w / 2;
            let newBottom = this.y + this.h / 2;
            let zone = 15;


            if (prevBallX < left || prevBallX > right) {

                b.vel.x *= -1;
                b.vel.y *= -1;

                if ((b.pos.y + b.r / 2 > newTop && b.pos.y + b.r / 2 < newTop + zone &&
                        b.pos.x + b.r / 2 > newLeft && b.pos.x + b.r / 2 < newLeft + zone) ||
                    (b.pos.y - b.r / 2 < newBottom && b.pos.y - b.r / 2 > newBottom - zone &&
                        b.pos.x - b.r / 2 < newRight && b.pos.x - b.r / 2 > newRight - zone) ||
                    (b.pos.y + b.r / 2 > newTop && b.pos.y + b.r / 2 < newTop + zone &&
                        b.pos.x - b.r / 2 < newRight && b.pos.x - b.r / 2 > newRight - zone) ||
                    (b.pos.y - b.r / 2 < newBottom && b.pos.y - b.r / 2 > newBottom - zone &&
                        b.pos.x + b.r / 2 > newLeft && b.pos.x + b.r / 2 < newLeft + zone)) {

                    //                            console.log('angle')
                    b.vel.y *= -1;
                }
            }
        }
    }

    show(id) {
        if (this.state) {
            noStroke();
            fill(this.color);
            rectMode(CENTER);
            rect(this.x, this.y, this.w, this.h);
        }
    }
}
