class Snake {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(scl, 0);
        this.total = 0;
        this.tail = [];
    }

    update() {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.pos.x, this.pos.y);
        }

        this.pos.add(this.vel);
        this.vel.limit(scl);
    }

    dir(x, y) {
        this.vel.x = x * scl;
        this.vel.y = y * scl;
    }

    eat(food) {
        let d = dist(this.pos.x, this.pos.y, food.x, food.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    death() {
        for (var i = 0; i < this.tail.length; i++) {
            let head = this.tail[i];
            let d = dist(this.pos.x, this.pos.y, head.x, head.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
        }
    }

    edges() {
        if (this.pos.x < 0) {
            this.pos.x = width;
        } else if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        } else if (this.pos.y > height) {
            this.pos.y = 0;
        }
    }

    show() {
        stroke(50);
        strokeWeight(1);
        fill(255);

        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        rect(this.pos.x, this.pos.y, scl, scl);
    }
}
