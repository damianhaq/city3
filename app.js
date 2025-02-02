import { GAME, RESOURCES } from "./consts.js";
import { drawCircleOnMap, drawRectOnMap, Game } from "./DGamev3.js";
import { Resource } from "./Resource.js";

export const game = new Game();
game.init("canvas", GAME.width, GAME.height, 1);
game.updateCamera(600, 400);

export const map = createMap(30, 30, 20);

const stone = new Resource(
  "Stone",
  RESOURCES.stone.id,
  map,
  game,
  RESOURCES.stone.drawFunc
);
const tree = new Resource(
  "Tree",
  RESOURCES.tree.id,
  map,
  game,
  RESOURCES.tree.drawFunc
);
const water = new Resource(
  "Water",
  RESOURCES.water.id,
  map,
  game,
  RESOURCES.water.drawFunc
);
const grass = new Resource(
  "Grass",
  RESOURCES.grass.id,
  map,
  game,
  RESOURCES.grass.drawFunc
);

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
    map.cellLength -= zoomFactor;
    game.camera.x -= zoomFactor * cellsOnLeft;
    game.camera.y -= zoomFactor * cellsOnTop;
  }
};

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
