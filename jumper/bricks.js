class Bricks {
    constructor(id) {
        this.id = id;
        this.x = (this.id % cols) * scl;
        this.y = parseInt(this.id / cols) * scl;
    }

    update(b, id) {
        let left = this.x - b.r;
        let right = this.x + b.r + scl;
        let top = this.y - b.r;
        let bottom = this.y + b.r + scl;

        if (b.pos.x > left && b.pos.x < right && b.pos.y > top && b.pos.y < bottom) {

            if (b.pos.x + b.r < this.x + 20 && b.pos.x + b.r > this.x - 20) {
                //                        left
                b.pos.x = this.x - b.r;
                //                        console.log("left: ", b.pos.x + b.r < this.x + 20 && b.pos.x + b.r > this.x - 20)
            }
            if (b.pos.x - b.r > this.x + scl - 20 && b.pos.x - b.r < this.x + scl + 20) {
                //                        right
                b.pos.x = this.x + scl + b.r;
                //                        console.log("right: ", b.pos.x - b.r > this.x + scl - 10 && b.pos.x - b.r < this.x + scl + 10);
            }

            if (b.pos.y + b.r > this.y - 20 && b.pos.y + b.r < this.y + 20 && b.pos.x + b.r > this.x && b.pos.x - b.r < this.x + scl) {
                //                        top
                b.pos.y = this.y - b.r;
                b.vel.set(0, 0);
                b.acc.set(0, 0);
                b.onGround = true;
                //                        console.log("top: ", b.pos.y + b.r > this.y - 20 && b.pos.y + b.r < this.y + 20);
            }


            if (b.pos.y - b.r > this.y + scl - 20 && b.pos.y - b.r < this.y + scl + 20 && b.pos.x + b.r > this.x && b.pos.x - b.r < this.x + scl) {
                //                        bottom
                b.pos.y = this.y + scl + b.r;
                b.vel.set(0, 0);
                b.acc.set(0, 0);
                //                        console.log("bottom: ", b.pos.y - b.r > this.y + scl - 20 && b.pos.y - b.r < this.y + scl + 20)
            }
        }
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(color("#993366"));
        rect(this.x, this.y, scl);

        //                fill(255);
        //                noStroke();
        //                textSize(14);
        //                textAlign(CENTER, CENTER);
        //                text(this.id, this.x + scl / 2, this.y + scl / 2);
    }
}
