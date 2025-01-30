import { GAME, ID } from "./consts.js";
import { drawRectOnMap, Game } from "./DGamev3.js";

const game = new Game();
game.init("canvas", GAME.width, GAME.height, 1);

const map = createMap(30, 30, 40);
addIdToMap(map, 0.1, ID.tree);

game.draw = function () {
  drawMap(map);
};

game.update = function (deltaTime) {
  this.moveCameraRMB();
};

console.log(map);

function createMap(cellsWidth, cellsHeight, cellLength, fill = 0) {
  // create 2d array
  const arr = new Array(cellsWidth)
    .fill(null)
    .map(() => new Array(cellsHeight).fill(fill));
  const map = {
    width: cellsWidth,
    height: cellsHeight,
    cellLength: cellLength,
    arr: arr,
  };

  return map;
}

function drawMap(map) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      // color depends on id

      let color = null;
      switch (map.arr[y][x]) {
        case ID.stone:
          color = "gray";
          break;
        case ID.grass:
          color = "green";
          break;
        case ID.water:
          color = "blue";
          break;
        case ID.tree:
          color = "brown";
          break;
        default:
          color = "white";
      }

      drawRectOnMap(
        x * map.cellLength + 1,
        y * map.cellLength + 1,
        map.cellLength - 2,
        map.cellLength - 2,
        game.ctx,
        game.camera,
        color,
        1
      );
    }
  }
}

function addIdToMap(map, chance, id) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (Math.random() < chance) {
        map.arr[y][x] = id;
      }
    }
  }
}
