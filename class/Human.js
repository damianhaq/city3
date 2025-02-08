import { Vector } from "../DGamev3.js";

export class Human {
  constructor(x, y, game, map) {
    this.x = x;
    this.y = y;

    this.game = game;
    this.map = map;

    this.isWorking = false;

    this.myTask = null;
    this.destination = null;
  }

  draw(cellLength) {
    // circle 1
    this.game.ctx.beginPath();
    this.game.ctx.arc(
      this.x * cellLength - this.game.camera.x,
      this.y * cellLength - this.game.camera.y,
      cellLength / 8,
      0,
      Math.PI * 2
    );
    this.game.ctx.fillStyle = "#FF0000"; // Kolor czerwony
    this.game.ctx.strokeStyle = "#FF0000"; // Kolor czerwony

    this.game.ctx.stroke();

    // circle 2
    this.game.ctx.beginPath();
    this.game.ctx.arc(
      this.x * cellLength - this.game.camera.x,
      this.y * cellLength - this.game.camera.y,
      cellLength / 16,
      0,
      Math.PI * 2
    );

    this.game.ctx.fill();
  }

  stepTo(vector, deltaTime, cellLength) {
    // 2 cellLength na sekundę
    const speed = 0.1 * cellLength;
    const step = speed * deltaTime;
    this.x += vector.x * step;
    this.y += vector.y * step;
  }

  update(deltaTime, deficiency) {
    if (!this.isWorking) {
      this.lookForTask(deficiency);
    } else {
      this.work();
    }

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
      const speed = 2 * this.map.cellLength;
      const step = speed * deltaTime; // upewnij się, że deltaTime jest w sekundach

      if (distance < step) {
        this.x = this.destination.x;
        this.y = this.destination.y;
        this.destination = null;
      } else {
        this.stepTo(vector, deltaTime, this.map.cellLength);
      }
    }

    // rysowanie linii do destynacji
    if (this.destination) {
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(
        this.x * this.map.cellLength - this.game.camera.x,
        this.y * this.map.cellLength - this.game.camera.y
      );
      this.game.ctx.lineTo(
        this.destination.x * this.map.cellLength - this.game.camera.x,
        this.destination.y * this.map.cellLength - this.game.camera.y
      );
      this.game.ctx.stroke();
    }
  }

  lookForTask(deficiency) {
    if (deficiency.length === 0) return;

    const task = deficiency[0];
    deficiency.shift();

    this.takeTask(task);
  }

  takeTask(task) {
    this.isWorking = true;
    this.myTask = task;
  }

  work() {}

  setCellDestination(x, y) {
    this.destination = { x, y };
  }

  goToCell(x, y) {
    this.setCellDestination(x, y);
  }
}
