import { game } from "../app.js";
import { GAME } from "../consts.js";
import { drawLineOnMap, drawTextOnMap } from "../DGamev3.js";

export class Building {
  constructor(posCellsArr) {
    this.posCellsArr = posCellsArr; /* [
        { cellX: 50, cellY: 50 },
        { cellX: 51, cellY: 50 },
        { cellX: 52, cellY: 50 },
      ] */
  }

  draw() {
    for (let i = 0; i < this.posCellsArr.length; i++) {
      const el1 = this.posCellsArr[i];

      let drawTop = true;
      let drawRight = true;
      let drawBotttom = true;
      let drawLeft = true;

      for (let j = 0; j < this.posCellsArr.length; j++) {
        const el2 = this.posCellsArr[j];

        // check if cell is self
        if (el1.cellX === el2.cellX && el1.cellY === el2.cellY) {
        } else {
          // check top
          if (el1.cellX === el2.cellX && el1.cellY === el2.cellY + 1) {
            drawTop = false;
          }

          // right
          if (el1.cellX === el2.cellX - 1 && el1.cellY === el2.cellY) {
            drawRight = false;
          }

          // bottom
          if (el1.cellX === el2.cellX && el1.cellY === el2.cellY - 1) {
            drawBotttom = false;
          }

          // left
          if (el1.cellX === el2.cellX + 1 && el1.cellY === el2.cellY) {
            drawLeft = false;
          }
        }
      }

      this.#drawRect(
        el1.cellX,
        el1.cellY,
        drawTop,
        drawRight,
        drawBotttom,
        drawLeft
      );

      drawTextOnMap(
        `${el1.cellX},
        ${el1.cellY},
        ${drawTop},
        ${drawRight},
        ${drawBotttom},
        ${drawLeft}`,
        el1.cellX * GAME.cellLength,
        el1.cellY * GAME.cellLength,
        game
      );
    }
  }

  #drawRect(cellX, cellY, drawTop, drawRight, drawBotttom, drawLeft) {
    const p1 = { x: cellX * GAME.cellLength, y: cellY * GAME.cellLength };
    const p2 = {
      x: cellX * GAME.cellLength + GAME.cellLength,
      y: cellY * GAME.cellLength,
    };
    const p3 = {
      x: cellX * GAME.cellLength + GAME.cellLength,
      y: cellY * GAME.cellLength + GAME.cellLength,
    };
    const p4 = {
      x: cellX * GAME.cellLength,
      y: cellY * GAME.cellLength + GAME.cellLength,
    };

    if (drawTop) {
      // top line
      drawLineOnMap(
        p1.x,
        p1.y,
        p2.x,
        p2.y,
        game.ctx,
        game.camera,
        "#0576F8FF",
        2
      );
    }

    if (drawRight) {
      // right line
      drawLineOnMap(
        p2.x,
        p2.y,
        p3.x,
        p3.y,
        game.ctx,
        game.camera,
        "#0576F8FF",
        2
      );
    }

    if (drawBotttom) {
      // bottom line
      drawLineOnMap(
        p3.x,
        p3.y,
        p4.x,
        p4.y,
        game.ctx,
        game.camera,
        "#0576F8FF",
        2
      );
    }

    if (drawLeft) {
      // left line
      drawLineOnMap(
        p4.x,
        p4.y,
        p1.x,
        p1.y,
        game.ctx,
        game.camera,
        "#0576F8FF",
        2
      );
    }
  }
}
