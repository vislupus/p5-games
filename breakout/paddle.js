class Paddle {
    constructor() {
        this.x = width / 2;
        this.y = 570;
        this.w = 100;
        this.h = 15;
    }

    update() {
        this.x = mouseX;

        if (this.x > width - this.w / 2) {
            this.x = width - this.w / 2;
        }

        if (this.x < this.w / 2) {
            this.x = this.w / 2;
        }
    }

    show() {
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);

        //                fill(color("red"));
        //                ellipse(this.x - this.w / 2, this.y - this.h / 2, 5);
        //                ellipse(this.x - this.w / 2, this.y + this.h / 2, 5);
        //                ellipse(this.x + this.w / 2, this.y - this.h / 2, 5);
        //                ellipse(this.x + this.w / 2, this.y + this.h / 2, 5);

        //                strokeWeight(3);
        //                let left = this.x - this.w / 2;
        //                let right = this.x + this.w / 2;
        //                let top = this.y - this.h / 2;
        //                let bottom = this.y + this.h / 2;
        //                stroke(color("red"));
        //                line(left, top, left, bottom);
        //
        //                stroke(color("green"));
        //                line(right, top, right, bottom);
        //
        //                stroke(color("blue"));
        //                line(left, top, right, top);
        //
        //                stroke(color("gold"));
        //                line(left, bottom, right, bottom);
    }
}
