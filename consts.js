import { drawStone, drawGrass, drawWater, drawTree } from "./functions.js";

export const GAME = {
  width: 1200,
  height: 800,
  showGrid: true,
  mapZoom: 1,
  cellLength: 30,
};

export const deficiency = []; // tablica z brakami surowców

export const RESOURCES = {
  stone: { id: 1, name: "Stone", drawCallback: drawStone, collidable: true },
  grass: { id: 2, name: "Grass", drawCallback: drawGrass, collidable: false },
  water: { id: 3, name: "Water", drawCallback: drawWater, collidable: true },
  tree: { id: 4, name: "Tree", drawCallback: drawTree, collidable: false },
};
