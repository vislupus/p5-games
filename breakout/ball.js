class Ball {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.r = 20;
        this.v = 2;
        this.vel = createVector(this.v, this.v);
    }

    update() {
        this.pos.add(this.vel);

        if (this.pos.x <= this.r / 2 || this.pos.x >= width - this.r / 2) {
            this.vel.x = -this.vel.x;
        }

        if (this.pos.y <= this.r / 2) {
            this.vel.y = -this.vel.y;
        }


        if (this.pos.y > height + this.r) {
            this.pos.x = width / 2;
            this.pos.y = height / 2;
            this.vel.x = this.v;
            this.vel.y = this.v;
            let angle = random(-5 * PI / 4, -7 * PI / 4);
            this.vel.x = 5 * cos(angle);
            this.vel.y = 5 * sin(angle);
        }
    }

    edge(p) {
        let left = p.x - this.r / 2 - p.w / 2;
        let right = p.x + this.r / 2 + p.w / 2;
        let top = p.y - this.r / 2 - p.h / 2;
        let bottom = p.y;

        if (this.pos.x > left &&
            this.pos.x < right &&
            this.pos.y > top &&
            this.pos.y < bottom) {

            this.vel.y *= -1;
            this.vel.x = (this.pos.x - p.x) * 0.05;
        }
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r);

        //        fill(color("red"));
        //        ellipse(this.pos.x, this.pos.y, 5);
        //        
        //        noFill()
        //        stroke(255)
        //        line(this.pos.x, this.pos.y,this.pos.x+this.vel.x*10, this.pos.y+this.vel.y*10)
    }
}
