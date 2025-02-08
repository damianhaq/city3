import { game } from "./app.js";
import { GAME } from "./consts.js";

// drawing functions

export function drawTree(cellX, cellY) {
  // internal constants
  const trunkHeight = GAME.cellLength / 4;
  const trunkWidth = GAME.cellLength / 8;
  const foliageRadius = GAME.cellLength / 4;

  // calculate x and y based on cellX and cellY
  let x = cellX * GAME.cellLength + GAME.cellLength / 2;
  let y = cellY * GAME.cellLength + GAME.cellLength / 2;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y -= 2;

  // Rysowanie pnia drzewa
  game.ctx.fillStyle = "#8B4513"; // Kolor brązowy
  game.ctx.fillRect(
    x - trunkWidth / 2,
    y - trunkHeight + GAME.cellLength / 2.5,
    trunkWidth,
    trunkHeight
  );

  // Rysowanie korony drzewa (liście)
  game.ctx.beginPath();
  game.ctx.arc(x, y, foliageRadius, 0, Math.PI * 2);
  game.ctx.fillStyle = "#228B22"; // Kolor zielony
  game.ctx.fill();
}

export function drawStone(cellX, cellY) {
  // internal constants
  const stoneRadius = GAME.cellLength / 7;
  // calculate x and y based on cellX and cellY
  let x = cellX * GAME.cellLength + GAME.cellLength / 2;
  let y = cellY * GAME.cellLength + GAME.cellLength / 2;

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
    x + GAME.cellLength / 8,
    y + GAME.cellLength / 8,
    stoneRadius * 1.2,
    0,
    Math.PI * 2
  );
  game.ctx.fillStyle = "#4f4f4f"; // Kolor szary
  game.ctx.fill();

  // kolejny kamień
  game.ctx.beginPath();
  game.ctx.arc(
    x - GAME.cellLength / 8,
    y + GAME.cellLength / 8,
    stoneRadius * 1.2,
    0,
    Math.PI * 2
  );
  game.ctx.fillStyle = "#585858FF"; // Kolor szary
  game.ctx.fill();
}

export function drawWater(cellX, cellY) {
  // internal constants
  const xStartOffset = -(GAME.cellLength / 4);
  const xEndOffset = GAME.cellLength / 4;

  // calculate x and y based on cellX and cellY
  let x = cellX * GAME.cellLength + GAME.cellLength / 2;
  let y = cellY * GAME.cellLength + GAME.cellLength / 2;

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
    y - GAME.cellLength / 4,
    x,
    y + GAME.cellLength / 4,
    x + xEndOffset,
    y
  );
  game.ctx.stroke();
}

export function drawGrass(cellX, cellY) {
  // calculate x and y based on cellX and cellY
  let x = cellX * GAME.cellLength + GAME.cellLength / 2;
  let y = cellY * GAME.cellLength + GAME.cellLength / 2;

  // adding camera position
  x -= game.camera.x;
  y -= game.camera.y;

  // correction position
  y += GAME.cellLength / 8;

  game.ctx.strokeStyle = "#228B22"; // Zielony kolor trawy
  game.ctx.lineWidth = 2;

  const radius = GAME.cellLength / 4;

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
