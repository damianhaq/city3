import { GAME } from "../consts.js";
import { drawTextOnMap, Vector } from "../DGamev3.js";
import { Resource } from "./Resource.js";

export class Human {
  constructor(x, y, game, map) {
    this.x = x;
    this.y = y;
    this.map = map;
    this.workExperience = [
      {
        resourceID: 1, // stone
        amount: 3,
        harvestSpeed: 2,
      },
      {
        resourceID: 2, // grass
        amount: 3,
        harvestSpeed: 1,
      },
    ];

    this.speedPerSec = GAME.cellLength * 0.1;
    this.game = game;

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

    // if destination exist, first remove outline from it
    if (this.destination) {
      console.log(x, y);
      if (
        this.map.getCell(this.destination.x, this.destination.y) instanceof
        Resource
      )
        this.map.map[this.destination.y][this.destination.x].isOutline = false;
    }

    this.destination = new Vector(x, y);

    if (this.map.getCell(x, y) instanceof Resource)
      this.map.map[y][x].isOutline = true;
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

        const resource = this.map.getCell(this.x, this.y);

        if (resource instanceof Resource) {
          resource.isOutline = false;

          // find experience with this resource
          const exp = this.#getExperienceForResource(resource);
          // console.log("exp", exp);

          resource.harvest(
            exp.amount,
            exp.harvestSpeed,
            this.finishHarvestCallback
          );
          this.isWorking = true;
        }
        this.destination = null;
        this.state = null;
      } else {
        this.x += vector.x * step;
        this.y += vector.y * step;
      }
    }
  }

  finishHarvestCallback() {
    console.log("finish");
    this.isWorking = false;
    // console.log(this.workExperience);
  }

  addExperience(resource) {}

  #getExperienceForResource(resource) {
    let exp = this.workExperience.find((exp) => exp.resourceID === resource.id);
    if (!exp) {
      exp = { resourceID: resource.id, amount: 2, harvestSpeed: 1 };
      this.workExperience.push(exp);
    }
    return exp;
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
