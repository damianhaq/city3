import { GAME } from "../consts.js";
import { drawTextOnMap, Vector } from "../DGamev3.js";

export class Human {
  constructor(x, y, game, map) {
    this.x = x;
    this.y = y;
    this.speedPerSec = GAME.cellLength * 0.1;

    this.game = game;
    this.map = map;

    this.isWorking = false;

    this.myTask = null;
    this.state = null;
    this.destination = null;
  }

  draw(cellLength) {
    this.game.ctx.fillStyle = "#FF0000"; // Kolor czerwony
    this.game.ctx.strokeStyle = "#FF0000"; // Kolor czerwony

    // circle 1
    this.game.ctx.beginPath();
    this.game.ctx.arc(
      this.x * cellLength - this.game.camera.x + GAME.cellLength / 2,
      this.y * cellLength - this.game.camera.y + GAME.cellLength / 2,
      cellLength / 8,
      0,
      Math.PI * 2
    );

    this.game.ctx.stroke();

    // circle 2
    this.game.ctx.beginPath();
    this.game.ctx.arc(
      this.x * cellLength - this.game.camera.x + GAME.cellLength / 2,
      this.y * cellLength - this.game.camera.y + GAME.cellLength / 2,
      cellLength / 16,
      0,
      Math.PI * 2
    );

    this.game.ctx.fill();

    drawTextOnMap(
      this.state,
      this.x * cellLength,
      this.y * cellLength,
      this.game
    );
  }

  setDestination(x, y) {
    this.state = "walking";
    this.destination = new Vector(x, y);
  }

  update(deltaTime, deficiency) {
    this.movement(deltaTime);
    this.drawLineToDestination();
  }

  movement(deltaTime) {
    // go to destination
    if (this.destination) {
      const vector = new Vector(
        this.destination.x - this.x,
        this.destination.y - this.y
      );
      const distance = Math.sqrt(vector.x ** 2 + vector.y ** 2);
      vector.normalize();

      // deltaTime -> s
      deltaTime /= 1000;

      // Obliczamy dystans do przebycia w obecnej klatce

      const step = this.speedPerSec * deltaTime; // upewnij się, że deltaTime jest w sekundach
      // console.log(step);

      if (distance < step) {
        this.x = this.destination.x;
        this.y = this.destination.y;
        this.destination = null;
        this.state = null;
      } else {
        this.x += vector.x * step;
        this.y += vector.y * step;
      }
    }
  }

  drawLineToDestination() {
    if (this.destination) {
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(
        this.x * GAME.cellLength - this.game.camera.x + GAME.cellLength / 2,
        this.y * GAME.cellLength - this.game.camera.y + GAME.cellLength / 2
      );
      this.game.ctx.lineTo(
        this.destination.x * GAME.cellLength -
          this.game.camera.x +
          GAME.cellLength / 2,
        this.destination.y * GAME.cellLength -
          this.game.camera.y +
          GAME.cellLength / 2
      );
      this.game.ctx.stroke();
    }
  }

  // lookForTask(deficiency) {
  //   if (deficiency.length === 0) return;

  //   const task = deficiency[0];
  //   deficiency.shift();

  //   this.takeTask(task);
  // }

  // takeTask(task) {
  //   this.isWorking = true;
  //   this.myTask = task;
  // }

  work() {}

  // setCellDestination(x, y) {
  //   this.destination = { x, y };
  // }
}
