import { game } from "../app.js";
import { GAME, RESOURCES } from "../consts.js";
import { drawRectOnMap } from "../DGamev3.js";
import { Resource } from "./Resource.js";

export class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.map = this.createMap();
  }

  createMap(fill = null) {
    // create 2d array
    const map = new Array(this.width)
      .fill(null)
      .map(() => new Array(this.height).fill(fill));

    // console.log("map created:", map);
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

  addResourceToMap(chance, RESOURCE) {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (Math.random() < chance) {
          this.map[y][x] = new Resource(RESOURCE, game);
        }
      });
    });
  }

  growResources(RESOURCE, threshold, chance, iterations) {
    // let iteration = 0;
    // const interval = setInterval(() => {
    //   if (iteration >= iterations) {
    //     clearInterval(interval);
    //     return;
    //   }

    for (let i = 0; i < iterations; i++) {
      const newMap = this.createMap();
      this.map.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (this.getCell(x, y) instanceof Resource) {
            newMap[y][x] = this.getCell(x, y);
          } else {
            const neighbourCount = this.countNeighbours(x, y, RESOURCE);
            if (neighbourCount >= threshold) {
              if (Math.random() < chance) {
                newMap[y][x] = new Resource(RESOURCE, game);
              }
            }
          }
        });
      });
      this.map = newMap;
    }
    //   iteration++;
    // }, 100);
  }

  smoothingResources(resource, neighborsToAlive, iterations) {
    for (let i = 0; i < iterations; i++) {
      const newMap = this.createMap();
      this.map.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell instanceof Resource && cell.id === resource.id) {
            const neighbourCount = this.countNeighbours(x, y, resource);
            if (neighbourCount > neighborsToAlive) {
              newMap[y][x] = cell;
            }
          } else {
            newMap[y][x] = cell;
          }
        });
      });
      this.map = newMap;
    }
  }

  countNeighbours(cellX, cellY, RESOURCE) {
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
          this.getCell(neighbourX, neighbourY).id === RESOURCE.id
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
