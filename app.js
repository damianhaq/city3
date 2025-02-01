import { GAME, ID } from "./consts.js";
import { drawCircleOnMap, drawRectOnMap, Game } from "./DGamev3.js";

const game = new Game();
game.init("canvas", GAME.width, GAME.height, 1);
game.updateCamera(600, 400);

const map = createMap(30, 30, 40);
addIdToMap(map, 0.1, ID.tree);
addIdToMap(map, 0.1, ID.stone);
addIdToMap(map, 0.1, ID.water);
addIdToMap(map, 0.1, ID.grass);

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

      let color = getColorById(map.arr[y][x]);

      // draw empty cells
      if (map.arr[y][x] === 0 && GAME.showGrid) {
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
      } else if (map.arr[y][x] !== 0) {
        // draw filled cells
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

      // draw resources
      drawResource(map.arr[y][x], color, x, y);
    }
  }
}

function drawTree(x, y) {
  // internal constants
  const trunkHeight = 10;
  const trunkWidth = 5;
  const foliageRadius = 10;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y -= 2;

  // Rysowanie pnia drzewa
  game.ctx.fillStyle = "#8B4513"; // Kolor brązowy
  game.ctx.fillRect(
    x - trunkWidth / 2,
    y - trunkHeight + 15,
    trunkWidth,
    trunkHeight
  );

  // Rysowanie korony drzewa (liście)
  game.ctx.beginPath();
  game.ctx.arc(x, y, foliageRadius, 0, Math.PI * 2);
  game.ctx.fillStyle = "#228B22"; // Kolor zielony
  game.ctx.fill();
}

function drawStone(x, y) {
  // internal constants
  const stoneRadius = 5;
  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  // y -= 2;

  // Rysowanie kamienia
  game.ctx.beginPath();
  game.ctx.arc(x, y, stoneRadius, 0, Math.PI * 2);
  game.ctx.fillStyle = "#606060FF"; // Kolor szary
  game.ctx.fill();

  // kolejny kanień
  game.ctx.beginPath();
  game.ctx.arc(x + 3, y + 3, stoneRadius + 2, 0, Math.PI * 2);
  game.ctx.fillStyle = "#4f4f4f"; // Kolor szary
  game.ctx.fill();

  // kolejny kanień
  game.ctx.beginPath();
  game.ctx.arc(x - 3, y + 4, stoneRadius + 1, 0, Math.PI * 2);
  game.ctx.fillStyle = "#585858FF"; // Kolor szary
  game.ctx.fill();
}

function drawWater(x, y) {
  // internal constants
  const xStartOffset = -(map.cellLength / 4);
  const xEndOffset = map.cellLength / 4;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  // y -= 2;

  game.ctx.strokeStyle = "#0000FF"; // Ciemnoniebieski kolor fal
  game.ctx.lineWidth = 2;

  game.ctx.beginPath();
  game.ctx.moveTo(x + xStartOffset, y);

  game.ctx.bezierCurveTo(
    x,
    y - map.cellLength / 4,
    x,
    y + map.cellLength / 4,
    x + xEndOffset,
    y
  );
  game.ctx.stroke();
}

function drawGrass(x, y) {
  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y += 5;

  game.ctx.strokeStyle = "#228B22"; // Zielony kolor trawy
  game.ctx.lineWidth = 2;

  const radius = 10;
  game.ctx.beginPath();
  game.ctx.arc(x - radius, y, radius, 0, degToRad(300), true);
  game.ctx.stroke();

  // second blade of grass
  game.ctx.beginPath();
  game.ctx.arc(x + radius, y, radius, degToRad(180), degToRad(230));
  game.ctx.stroke();
}

// angle to radians function
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function drawResource(id, color, x, y) {
  switch (id) {
    case ID.stone:
      drawStone(
        x * map.cellLength + map.cellLength / 2,
        y * map.cellLength + map.cellLength / 2
      );
      break;
    case ID.grass:
      drawGrass(
        x * map.cellLength + map.cellLength / 2,
        y * map.cellLength + map.cellLength / 2
      );

      break;
    case ID.water:
      drawWater(
        x * map.cellLength + map.cellLength / 2,
        y * map.cellLength + map.cellLength / 2
      );
      break;
    case ID.tree:
      drawTree(
        x * map.cellLength + map.cellLength / 2,
        y * map.cellLength + map.cellLength / 2
      );
      break;
    default:
      break;
  }
}

function getColorById(id) {
  switch (id) {
    case ID.stone:
      return "#4f4f4f";
    case ID.grass:
      return "green";
    case ID.water:
      return "blue";
    case ID.tree:
      return "#199c1f";
    default:
      return "white";
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
