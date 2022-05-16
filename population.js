class Population {
  constructor(m, num, gravity) {
    this.mutationRate = m ? m : 0.01;
    this.num = num ? num : 100;
    this.gravity = gravity ? gravity : 5;
    this.matingPool = [];
    this.generations = 0;
    this.population = new Array(this.num);

    for (let i = 0; i < this.population.length; i++) {
      let position = createVector(40, height - 200);
      this.population[i] = new Ball(position, new DNA(), this.gravity);
    }
  }

  live(os) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].checkTarget();
      this.population[i].run(os);
    }
  }

  targetReached() {
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].hitTarget) return true;
    }
    return false;
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  }

  selection() {
    this.matingPool = [];

    let maxFitness = this.getMaxFitness();

    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = map(
        this.population[i].getFitness(),
        0,
        maxFitness,
        0,
        1
      );
      let n = int(fitnessNormal * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  reproduction() {
    hitTarget = 0;
    for (let i = 0; i < this.population.length; i++) {
      let p1 = int(random(this.matingPool.length));
      let p2 = int(random(this.matingPool.length));

      let parent1 = this.matingPool[p1];
      let parent2 = this.matingPool[p2];

      let parentGenes1 = parent1.getDNA();
      let parentGenes2 = parent2.getDNA();

      let child = parentGenes1.crossover(parentGenes2, this.mutationRate);

      let position = createVector(40, height - 200);
      this.population[i] = new Ball(position, child, this.gravity);
    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }
}
