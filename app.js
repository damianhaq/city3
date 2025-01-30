import { GAME } from "./consts.js";
import { drawRectOnMap, Game } from "./DGamev3.js";

const game = new Game();
game.init("canvas", GAME.width, GAME.height, 2);

const map = createMap(10, 10, 15);

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
      //   console.log(map[y][x]);
      drawRectOnMap(
        x * map.cellLength,
        y * map.cellLength,
        map.cellLength,
        map.cellLength,
        game.ctx,
        game.camera,
        "#949494"
      );
    }
  }
}
