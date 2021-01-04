class Ball {
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = m;
        this.r = sqrt(this.mass) * 10;
        this.gravity = createVector(0, 1);
        this.onGround = false;
    }

    dir(x, y) {
        this.vel.x = x;
        this.vel.y = y;
    }

    applyGravity() {
        let weight = p5.Vector.mult(this.gravity, this.mass);
        let force = p5.Vector.div(weight, this.mass);
        this.acc.add(force);
    }

    applyDrag() {
        // Direction of drag
        let drag = this.vel.copy();
        drag.normalize();
        drag.mult(-1);

        // Magnitude of drag
        let speed = this.vel.mag();
        let surfaceArea = (this.r * 2) / 10;
        let cDrag = 0.005;
        drag.setMag(cDrag * surfaceArea * speed ** 2);

        let force = p5.Vector.div(drag, this.mass);
        this.acc.add(force);
    }

    applyFriction() {
        // Direction of Friction
        let friction = this.vel.copy();
        friction.normalize();
        friction.mult(-1);

        // Magnitude of Friction
        let mu = 0.5;
        let normal = this.mass;
        friction.setMag(mu * normal);

        let force = p5.Vector.div(friction, this.mass);
        this.acc.add(force);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.set(0, 0);

        if (this.onGround) {
            this.applyFriction();

            jump = false;
        } else {
            this.applyGravity();
            this.applyDrag();
        }

        let brick = (floor(this.pos.x / scl) + cols * floor((this.pos.y - this.r) / scl) + cols);

        if (!bricks.some(e => e.id === brick)) {
            this.onGround = false;
        }
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(color(0, 200, 0));
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}
