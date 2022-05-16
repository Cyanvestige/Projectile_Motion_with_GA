class DNA {
  constructor(newgenes) {
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifetime; i++) {
        this.genes = [random(0, 1), random(0, 10), random(0, 1), random(0, 10)];
      }
    }
  }

  crossover(partner, m) {
    let child = new Array(this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m)
        child[i] = random(
          partner.genes[i] + random(-0.1, 0.1),
          this.genes[i] + random(-0.1, 0.1)
        );
      else child[i] = random(partner.genes[i], this.genes[i]);
    }

    let newgenes = new DNA(child);
    return newgenes;
  }
}
