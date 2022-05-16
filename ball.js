class Ball {
  constructor(pos, dna, gravity) {
    this.acceleration = createVector();

    this.position = pos.copy();
    this.r = 4;
    this.dna = dna;
    this.finishTime = 0;
    this.recordDist = 10000;
    this.gravitySpeed = 0;
    this.gravity = gravity * 0.01;
    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false;
    this.hitTarget = false;
    this.velocity = createVector(
      this.dna.genes[0] * this.dna.genes[1],
      -this.dna.genes[2] * this.dna.genes[3]
    );
  }

  calcFitness() {
    if (this.recordDist < 1) this.recordDist = 1;

    this.fitness = 1 / this.recordDist;

    if (this.hitObstacle) this.fitness *= 0.1;
    if (this.hitTarget) this.fitness *= 2;
  }

  run(os) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.update();
      this.obstacles(os);
    }
    if (!this.hitObstacle) {
      this.display();
    }
  }

  checkTarget() {
    let d = dist(
      this.position.x,
      this.position.y,
      target.position.x,
      target.position.y
    );
    if (d < this.recordDist) this.recordDist = d;

    if (target.contains(this.position) && !this.hitTarget) {
      this.hitTarget = true;
      hitTarget++;
      if (hitTarget > record) {
        record = hitTarget;
      }
    } else if (!this.hitTarget) {
      this.finishTime++;
    }
  }

  obstacles(os) {
    for (let i = 0; i < os.length; i++) {
      let obs = os[i];
      if (obs.contains(this.position)) {
        this.hitObstacle = true;
      }
    }
  }

  update() {
    this.gravitySpeed += this.gravity;
    this.position.add(this.velocity);
    this.position.add(0, this.gravitySpeed);
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    fill(0);

    arc(this.r / 2, this.r / 2, 5, 5, 2 * Math.PI, 0);

    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  stopped() {
    return this.hitObstacle;
  }
}
