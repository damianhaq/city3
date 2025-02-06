import { game, map } from "./app.js";

export const GAME = {
  width: 1200,
  height: 800,
  showGrid: false,
};

export function getCell(x, y, map) {
  return map.arr[y][x];
}

export const RESOURCES = {
  stone: { id: 1, name: "Stone", drawCallback: drawStone, collidable: true },
  grass: { id: 2, name: "Grass", drawCallback: drawGrass, collidable: false },
  water: { id: 3, name: "Water", drawCallback: drawWater, collidable: true },
  tree: { id: 4, name: "Tree", drawCallback: drawTree, collidable: false },
};

// drawing functions

function drawTree(cellX, cellY) {
  // internal constants
  const trunkHeight = map.cellLength / 4;
  const trunkWidth = map.cellLength / 8;
  const foliageRadius = map.cellLength / 4;

  // calculate x and y based on cellX and cellY
  let x = cellX * map.cellLength + map.cellLength / 2;
  let y = cellY * map.cellLength + map.cellLength / 2;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y -= 2;

  // Rysowanie pnia drzewa
  game.ctx.fillStyle = "#8B4513"; // Kolor brązowy
  game.ctx.fillRect(
    x - trunkWidth / 2,
    y - trunkHeight + map.cellLength / 2.5,
    trunkWidth,
    trunkHeight
  );

  // Rysowanie korony drzewa (liście)
  game.ctx.beginPath();
  game.ctx.arc(x, y, foliageRadius, 0, Math.PI * 2);
  game.ctx.fillStyle = "#228B22"; // Kolor zielony
  game.ctx.fill();
}

function drawStone(cellX, cellY) {
  // internal constants
  const stoneRadius = map.cellLength / 7;
  // calculate x and y based on cellX and cellY
  let x = cellX * map.cellLength + map.cellLength / 2;
  let y = cellY * map.cellLength + map.cellLength / 2;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y -= 2;

  // Rysowanie kamienia
  game.ctx.beginPath();
  game.ctx.arc(x, y, stoneRadius, 0, Math.PI * 2);
  game.ctx.fillStyle = "#606060FF"; // Kolor szary
  game.ctx.fill();

  // kolejny kamień
  game.ctx.beginPath();
  game.ctx.arc(
    x + map.cellLength / 8,
    y + map.cellLength / 8,
    stoneRadius * 1.2,
    0,
    Math.PI * 2
  );
  game.ctx.fillStyle = "#4f4f4f"; // Kolor szary
  game.ctx.fill();

  // kolejny kamień
  game.ctx.beginPath();
  game.ctx.arc(
    x - map.cellLength / 8,
    y + map.cellLength / 8,
    stoneRadius * 1.3,
    0,
    Math.PI * 2
  );
  game.ctx.fillStyle = "#585858FF"; // Kolor szary
  game.ctx.fill();
}

function drawWater(cellX, cellY) {
  // internal constants
  const xStartOffset = -(map.cellLength / 4);
  const xEndOffset = map.cellLength / 4;

  // calculate x and y based on cellX and cellY
  let x = cellX * map.cellLength + map.cellLength / 2;
  let y = cellY * map.cellLength + map.cellLength / 2;

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

function drawGrass(cellX, cellY) {
  // calculate x and y based on cellX and cellY
  let x = cellX * map.cellLength + map.cellLength / 2;
  let y = cellY * map.cellLength + map.cellLength / 2;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y += map.cellLength / 8;

  game.ctx.strokeStyle = "#228B22"; // Zielony kolor trawy
  game.ctx.lineWidth = 2;

  const radius = map.cellLength / 4;

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
