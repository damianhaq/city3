import { deficiency, GAME, RESOURCES } from "./consts.js";
import { drawCircleOnMap, drawRectOnMap, Game } from "./DGamev3.js";
import { Resource } from "./class/Resource.js";
import { Human } from "./class/Human.js";

import { Map } from "./class/Map.js";
import { Building } from "./class/Building.js";

export const game = new Game();
game.init("canvas", GAME.width, GAME.height, 1);
game.updateCamera(1500, 1500);

const map = new Map(100, 100);

const building = new Building([
  { cellX: 50, cellY: 50 },
  { cellX: 51, cellY: 50 },
  { cellX: 53, cellY: 49 },
  { cellX: 52, cellY: 50 },
]);

// DEFICIENCY
// addDeficiency(RESOURCES.stone, 10);
// addDeficiency(RESOURCES.tree, 5);
// addDeficiency(RESOURCES.stone, 10);
// console.log("deficiency", deficiency);

const humans = [];

const human = new Human(50, 50, game, map);
humans.push(human);
// humans.push(human);

console.log("humans", humans);

// const stone = new Resource(RESOURCES.stone, game);
// const grass = new Resource(RESOURCES.grass, game);
// const water = new Resource(RESOURCES.water, game);
// const tree = new Resource(RESOURCES.tree, game);

map.addResourceToMap(0.02, RESOURCES.tree);
map.addResourceToMap(0.01, RESOURCES.stone);
map.addResourceToMap(0.01, RESOURCES.grass);
map.addResourceToMap(0.001, RESOURCES.water);

map.growResources(RESOURCES.tree, 2, 0.1, 30);
map.growResources(RESOURCES.grass, 1, 0.01, 30);
map.growResources(RESOURCES.water, 1, 0.2, 10);

map.smoothingResources(RESOURCES.tree, 3, 10);
map.smoothingResources(RESOURCES.water, 4, 10);

console.log(map.map);

game.onMouseWheel = function (e) {
  const zoomFactor = 5;

  // ile kratek jest po lewej stronie ekranu
  const cellsOnLeft = (game.camera.x + GAME.width / 2) / GAME.cellLength;
  // ile kratek jest na górze ekranu
  const cellsOnTop = (game.camera.y + GAME.height / 2) / GAME.cellLength;

  // zoom in and out
  if (e.deltaY < 0) {
    // zoom in
    GAME.cellLength += zoomFactor;
    game.camera.x += zoomFactor * cellsOnLeft;
    game.camera.y += zoomFactor * cellsOnTop;
  } else {
    // zoom out
    if (GAME.cellLength <= 10) return; // dont zoom out more than 10
    GAME.cellLength -= zoomFactor;
    game.camera.x -= zoomFactor * cellsOnLeft;
    game.camera.y -= zoomFactor * cellsOnTop;
  }

  console.log("zoom, cellLength", GAME.cellLength);
};

game.onClickLMB = function () {
  // get cell position include camera position and camera
  const cellX = Math.floor((game.mouse.x + game.camera.x) / GAME.cellLength);
  const cellY = Math.floor((game.mouse.y + game.camera.y) / GAME.cellLength);

  const cell = map.getCell(cellX, cellY);
  console.log("LMB", cellX, cellY, cell);

  // const neighbourCount = map.countNeighbours(x, y, tree);
  // console.log("Neighbours Count", neighbourCount);

  // human.setDestination(x, y);
  building.addCell(cellX, cellY);
};

game.draw = function (deltaTime) {
  map.drawMap(deltaTime);
  map.drawMapBounds();
  humans.forEach((human) => human.draw(GAME.cellLength));
  building.draw();
};

game.update = function (deltaTime) {
  this.moveCameraRMB();
  humans.forEach((human) => {
    human.update(deltaTime, deficiency);
  });
};

function createMap(cellsWidth, cellsHeight, fill = 0) {
  // create 2d array
  const arr = new Array(cellsWidth)
    .fill(null)
    .map(() => new Array(cellsHeight).fill(fill));

  const map = {
    width: cellsWidth,
    height: cellsHeight,
    arr: arr,
  };

  return map;
}

function drawMap(map) {
  map.arr.forEach((row, y) => {
    row.forEach((resource, x) => {
      if (resource instanceof Resource) {
        resource.draw(x, y);
        // console.log(resource.x);
      }
    });
  });
}

function addResourceToMap(map, chance, id) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (Math.random() < chance) {
        map.arr[y][x] = id;
      }
    }
  }
}

function addDeficiency(resource, amount) {
  const obj = {
    resource,
    amount,
  };

  // check if resource is already in deficiency array
  const found = deficiency.find((def) => def.resource.id === resource.id);
  if (found) {
    found.amount += amount;
  } else {
    deficiency.push(obj);
  }
}
