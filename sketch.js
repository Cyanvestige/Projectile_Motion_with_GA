let lifetime;

let population;

let lifecycle;
let numberOfBalls;
let mutationRate;
let gravity;
let hitTarget;
let round;
let record;

let target;

let obstacles = [];
let startBtn = document.querySelector(".start-game-button");
let started = false;
function setup() {
  createCanvas(1280, 720);
  noLoop();

  numberOfBalls = parseInt(document.querySelector("#numberOfBalls").value);
  mutationRate = parseFloat(document.querySelector("#mutation").value);
  gravity = parseFloat(document.querySelector("#gravity").value);
  lifetime = 500;
  if (gravity < 4) lifetime = 1000;

  hitTarget = 0;
  round = 1;
  record = 0;
  lifecycle = 0;

  target = new Obstacle(width / 2 + 300, height / 2, 24, 24);

  population = new Population(mutationRate * 0.01, numberOfBalls, gravity);

  obstacles = [];
  obstacles.push(new Obstacle(width / 2 - 300, height / 2 - 200, 10, 300));
  obstacles.push(new Obstacle(width / 2 - 100, height / 2 + 100, 10, 300));
  obstacles.push(new Obstacle(width / 2 + 100, height / 2 - 200, 10, 300));
  obstacles.push(new Obstacle(0, height - 150, 100, 150));
  obstacles.push(new Obstacle(0, height - 200, 100, 50));
}

startBtn.addEventListener("click", function () {
  setup();
  document.querySelector(".start-game-window").style.display = "none";
});

function draw() {
  if (started) {
    background(255);

    target.display();

    if (lifecycle < lifetime) {
      population.live(obstacles);
      lifecycle++;
    } else {
      round++;
      lifecycle = 0;
      population.calcFitness();
      population.selection();
      population.reproduction();
    }

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].display();
    }

    fill(0);
    noStroke();
    text("Round: " + round, 10, 18);
    text("Gravity: " + (isNaN(gravity) ? 5 : gravity), 10, 36);
    text(
      "Mutation Rate: " + (isNaN(mutationRate) ? 1 : mutationRate) + "%",
      10,
      54
    );
    text(
      "Total Number of Balls: " + (isNaN(numberOfBalls) ? 100 : numberOfBalls),
      10,
      72
    );
    text("Generation #: " + population.getGenerations(), 10, 90);
    text("Cycles left: " + (lifetime - lifecycle), 10, 108);
    text("Hit Target: " + hitTarget, 10, 126);
    text("Record: " + record, 10, 144);
  }
}

function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
}

function start() {
  started = true;
  loop();
}

startBtn.addEventListener("click", function () {
  start();
  document.querySelector(".start-game-window").style.display = "none";
});
