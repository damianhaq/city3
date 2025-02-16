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

    this.#isCellsCorrect(this.posCellsArr);
  }

  #check4Neighbors(cell, arr) {
    let isTop = false;
    let isRight = false;
    let isBottom = false;
    let isLeft = false;

    arr.forEach((neig) => {
      if (cell.cellX === neig.cellX && cell.cellY === neig.cellY) {
        // cell is neig
      } else {
        // check top
        if (cell.cellX === neig.cellX && cell.cellY === neig.cellY + 1) {
          isTop = true;
        }

        // right
        if (cell.cellX === neig.cellX - 1 && cell.cellY === neig.cellY) {
          isRight = true;
        }

        // bottom
        if (cell.cellX === neig.cellX && cell.cellY === neig.cellY - 1) {
          isBottom = true;
        }

        // left
        if (cell.cellX === neig.cellX + 1 && cell.cellY === neig.cellY) {
          isLeft = true;
        }
      }
    });

    return { isTop, isRight, isBottom, isLeft };
  }

  draw() {
    for (let i = 0; i < this.posCellsArr.length; i++) {
      const el1 = this.posCellsArr[i];

      const neig = this.#check4Neighbors(el1, this.posCellsArr);

      this.#drawRect(
        el1.cellX,
        el1.cellY,
        !neig.isTop,
        !neig.isRight,
        !neig.isBottom,
        !neig.isLeft
      );

      // drawTextOnMap(
      //   `${el1.cellX},
      //   ${el1.cellY},
      //   ${drawTop},
      //   ${drawRight},
      //   ${drawBotttom},
      //   ${drawLeft}`,
      //   el1.cellX * GAME.cellLength,
      //   el1.cellY * GAME.cellLength,
      //   game
      // );
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

  #isCellsCorrect(arr) {
    let correct = true;
    if (arr.length !== 1) {
      arr.forEach((cell) => {
        const neig = this.#check4Neighbors(cell, arr);

        if (neig.isTop || neig.isRight || neig.isBottom || neig.isLeft) {
          console.log("correct cell");
        } else {
          correct = false;
          console.warn("incorrect cell");
        }
      });
    }

    return correct;
  }

  addCell(cellX, cellY) {
    // check if that cell exist

    if (
      this.posCellsArr.find(
        (el) => el.cellX === cellX && el.cellY === cellY
      ) === undefined
    ) {
      // create copy -> add cell -> check if is correct
      if (this.#isCellsCorrect([...this.posCellsArr, { cellX, cellY }])) {
        this.posCellsArr.push({ cellX, cellY });
        console.log("building:", this.posCellsArr);
      } else {
        // console.warn("cells are incorrect");
      }
    } else {
      console.warn("this cell exist", cellX, cellY);
      console.log("building:", this.posCellsArr);
    }
  }
}
