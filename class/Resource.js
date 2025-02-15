import { GAME } from "../consts.js";
import { drawLineOnMap, drawRectOnMap, drawTextOnMap } from "../DGamev3.js";

export class Resource {
  constructor(resource, game) {
    this.name = resource.name;
    this.id = resource.id;
    this.drawCallback = resource.drawCallback;
    this.extractionTime = resource.extactionTime;
    this.currentExtractionTime = resource.extactionTime;
    this.amount = resource.amount;

    // harvest speed from human, if 2 then speed is * 2
    this.harvestSpeed = 1;

    this.game = game;

    this.isOutline = false;
    this.isShowAmount - false;
    this.isHarvesting = false;
    this.harvestingCompleteCallback = null;

    this.#isValid(resource);
  }

  // check if resource object have all the required properties and if not log an error
  #isValid(resource) {
    if (!resource.name) {
      console.log("Resource object must have a name property", resource);
    }

    if (!resource.id) {
      console.log("Resource object must have an id property", resource);
    }

    if (!resource.drawCallback) {
      console.log(
        "Resource object must have a drawCallback property",
        resource
      );
    }

    if (resource.collidable === undefined) {
      console.log("Resource object must have a collidable property", resource);
    }

    return true;
  }

  draw(x, y, deltaTime) {
    // draw outline
    if (this.isOutline)
      drawRectOnMap(
        x * GAME.cellLength + 1,
        y * GAME.cellLength + 1,
        GAME.cellLength - 2,
        GAME.cellLength - 2,
        this.game.ctx,
        this.game.camera
      );

    // draw resource
    this.drawCallback(x, y);

    // Update extraction progress if the resource is being harvested
    if (this.isHarvesting) {
      this.calculateProgressbar(deltaTime);

      this.drawProgressBar(
        this.currentExtractionTime,
        this.extractionTime,
        x,
        y
      );
    }

    // draw amount
    if (this.isShowAmount)
      drawTextOnMap(
        this.amount,
        x * GAME.cellLength,
        y * GAME.cellLength,
        this.game
      );
  }

  calculateProgressbar(deltaTime) {
    // Decrease current extraction time based on deltaTime,
    // ensuring it doesn't drop below 0
    this.currentExtractionTime = Math.max(
      0,
      this.currentExtractionTime - deltaTime * this.harvestSpeed
    );

    // Calculate percentage of harvesting completed
    // const progressPercent =
    //   ((this.extractionTime - this.currentExtractionTime) /
    //     this.extractionTime) *
    //   100;
    // console.log("Extraction progress:", progressPercent.toFixed(2) + "%");

    // harvesting complete
    if (this.currentExtractionTime === 0) {
      this.isHarvesting = false;
      this.harvestingCompleteCallback();
      this.currentExtractionTime = this.extractionTime;
    }
  }

  drawProgressBar(curr, max, x, y) {
    // Draw the outline of the progress bar
    const barX = x * GAME.cellLength + 1;
    const barY = y * GAME.cellLength + (GAME.cellLength / 8) * 7;
    const barWidth = GAME.cellLength - 2;
    const barHeight = GAME.cellLength / 8;
    drawRectOnMap(
      barX,
      barY,
      barWidth,
      barHeight,
      this.game.ctx,
      this.game.camera
    );

    // Calculate inner progress width without any inner margin
    const innerWidth = barWidth * (curr / max);
    // Draw progress bar filled inside the outline rectangle using drawRectOnMap
    drawRectOnMap(
      barX,
      barY,
      innerWidth,
      barHeight,
      this.game.ctx,
      this.game.camera,
      "#1447FFFF",
      1,
      true
    );

    // Draw additional vertical lines at the end of the progress bar using drawLineOnMap
    const lineColor = "#002AC4FF";
    const lineThickness = 2;

    // First vertical line at the end of the filled portion
    const firstLineX = barX + innerWidth - lineThickness;
    drawLineOnMap(
      firstLineX,
      barY,
      firstLineX,
      barY + barHeight,
      this.game.ctx,
      this.game.camera,
      lineColor,
      lineThickness
    );
  }

  harvest(amount, speed, callback) {
    this.isHarvesting = true;
    this.harvestSpeed = speed;
    this.harvestingCompleteCallback = callback;
    if (this.amount >= amount) {
      this.amount -= amount;
      // dropItem(amount)
    } else {
      // dropItem(this.amount)
      this.amount = 0;
    }

    if (this.amount === 0) {
      this.removeSelf();
    }
  }

  removeSelf() {
    console.log("removeSelf");
  }
}
