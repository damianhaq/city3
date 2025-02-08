import { game } from "../app.js";
import { GAME, RESOURCES } from "../consts.js";
import { drawRectOnMap } from "../DGamev3.js";
import { Resource } from "./Resource.js";

export class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.map = this.createMap();

    // this.mapGenerationConfig = {
    //   forest: { seedChance: 0.01 },
    // };
  }

  createMap(fill = null) {
    // create 2d array
    const map = new Array(this.width)
      .fill(null)
      .map(() => new Array(this.height).fill(fill));

    console.log("map created:", map);
    return map;
  }

  drawMap() {
    this.map.forEach((row, y) => {
      row.forEach((resource, x) => {
        if (resource instanceof Resource) {
          resource.draw(x, y);
        }
      });
    });
  }

  drawMapBounds() {
    drawRectOnMap(
      0,
      0,
      this.width * GAME.cellLength,
      this.height * GAME.cellLength,
      game.ctx,
      game.camera,
      " #000C8CFF",
      2
    );
  }

  addResourceToMap(chance, resource) {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (Math.random() < chance) {
          this.map[y][x] = resource;
        }
      });
    });
  }

  growResources(resource, threshold, chance, iterations) {
    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration >= iterations) {
        clearInterval(interval);
        return;
      }

      const newMap = this.createMap();
      this.map.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (this.getCell(x, y) instanceof Resource) {
            newMap[y][x] = this.getCell(x, y);
          } else {
            const neighbourCount = this.countNeighbours(x, y, resource);
            if (neighbourCount >= threshold) {
              if (Math.random() < chance) {
                newMap[y][x] = resource;
              }
            }
          }
        });
      });
      this.map = newMap;
      iteration++;
    }, 100);
  }

  countNeighbours(cellX, cellY, resource) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const neighbourX = cellX + i;
        const neighbourY = cellY + j;

        // check if neighbour is inside the map
        if (
          neighbourX < 0 ||
          neighbourY < 0 ||
          neighbourX >= this.width ||
          neighbourY >= this.height
        )
          continue;

        if (
          this.getCell(neighbourX, neighbourY) instanceof Resource &&
          this.getCell(neighbourX, neighbourY).id === resource.id
        ) {
          count++;
          //   console.log("neighbour", this.getCell(neighbourX, neighbourY));
        }
      }
    }
    return count;
  }

  getCell(x, y) {
    return this.map[y][x];
  }
}
