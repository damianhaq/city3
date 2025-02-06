import { GAME, getCell, RESOURCES } from "./consts.js";
import { drawCircleOnMap, drawRectOnMap, Game } from "./DGamev3.js";
import { Resource } from "./Resource.js";

export const game = new Game();
game.init("canvas", GAME.width, GAME.height, 1);
game.updateCamera(600, 400);

export const map = createMap(30, 30, 40);

const stone = new Resource(RESOURCES.stone, map, game);
const grass = new Resource(RESOURCES.grass, map, game);
const water = new Resource(RESOURCES.water, map, game);
const tree = new Resource(RESOURCES.tree, map, game);

addResourceToMap(map, 0.1, tree);
addResourceToMap(map, 0.01, water);
addResourceToMap(map, 0.1, grass);
addResourceToMap(map, 0.1, stone);

game.onMouseWheel = function (e) {
  const zoomFactor = 10;

  // ile kratek jest po lewej stronie ekranu
  const cellsOnLeft = (game.camera.x + GAME.width / 2) / map.cellLength;
  // ile kratek jest na górze ekranu
  const cellsOnTop = (game.camera.y + GAME.height / 2) / map.cellLength;

  // zoom in and out
  if (e.deltaY < 0) {
    map.cellLength += zoomFactor;
    game.camera.x += zoomFactor * cellsOnLeft;
    game.camera.y += zoomFactor * cellsOnTop;
  } else {
    if (map.cellLength <= 10) return; // dont zoom out more than 10
    map.cellLength -= zoomFactor;
    game.camera.x -= zoomFactor * cellsOnLeft;
    game.camera.y -= zoomFactor * cellsOnTop;
  }

  console.log("zoom", map.cellLength);
};

game.onClickLMB = function () {
  // get cell position include camera position and camera
  const x = Math.floor((game.mouse.x + game.camera.x) / map.cellLength);
  const y = Math.floor((game.mouse.y + game.camera.y) / map.cellLength);

  const cell = getCell(x, y, map);
  console.log("LMB", x, y, cell);
};

game.draw = function () {
  drawMap(map);
};

game.update = function (deltaTime) {
  this.moveCameraRMB();
};

console.log("map", map);

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
  map.arr.forEach((row, y) => {
    row.forEach((resource, x) => {
      if (resource !== 0) resource.draw(x, y);
    });
  });
}

// function drawResource(id, color, x, y) {
//   switch (id) {
//     case ID.stone:
//       drawStone(
//         x * map.cellLength + map.cellLength / 2,
//         y * map.cellLength + map.cellLength / 2
//       );
//       break;
//     case ID.grass:
//       drawGrass(
//         x * map.cellLength + map.cellLength / 2,
//         y * map.cellLength + map.cellLength / 2
//       );

//       break;
//     case ID.water:
//       drawWater(
//         x * map.cellLength + map.cellLength / 2,
//         y * map.cellLength + map.cellLength / 2
//       );
//       break;
//     case ID.tree:
//       drawTree(
//         x * map.cellLength + map.cellLength / 2,
//         y * map.cellLength + map.cellLength / 2
//       );
//       break;
//     default:
//       break;
//   }
// }

// function getColorById(id) {
//   switch (id) {
//     case ID.stone:
//       return "#4f4f4f";
//     case ID.grass:
//       return "green";
//     case ID.water:
//       return "blue";
//     case ID.tree:
//       return "#199c1f";
//     default:
//       return "white";
//   }
// }

function addResourceToMap(map, chance, id) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (Math.random() < chance) {
        map.arr[y][x] = id;
      }
    }
  }
}
