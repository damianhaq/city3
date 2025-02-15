import { drawStone, drawGrass, drawWater, drawTree } from "./functions.js";

export const GAME = {
  width: 1200,
  height: 800,
  showGrid: true,
  // mapZoom: 1,
  cellLength: 30,
  mode: null, // null, "plan"
};

export const deficiency = []; // tablica z brakami surowców

export const RESOURCES = {
  stone: {
    id: 1,
    name: "Stone",
    drawCallback: drawStone,
    collidable: true,
    extactionTime: 1000,
    amount: 10,
  },
  grass: {
    id: 2,
    name: "Grass",
    drawCallback: drawGrass,
    collidable: false,
    extactionTime: 1000,
    amount: 10,
  },
  water: {
    id: 3,
    name: "Water",
    drawCallback: drawWater,
    collidable: true,
    extactionTime: 1000,
    amount: 10,
  },
  tree: {
    id: 4,
    name: "Tree",
    drawCallback: drawTree,
    collidable: false,
    extactionTime: 1000,
    amount: 10,
  },
};

/*  
budynki:
1. nadają zadanie
  - różne, noszenie, pracowanie, ...
2. posiadają konkretnych praciowników 
  - jeden przynosi, drugi pracuje
  - to gracz tworzy logistyke, przydziela pracownika do pracy
3. same nic nie robią, tylko pracownicy w nich wykonują zadania
  - gracz decyduje ile pracowników donosi 
4. gracz sam wymyśla układ budynku w ramach wymagań i ograniczeń
  - np. mieszkanie zajmuje 3 kratki conajmniej i 5 maxymalnie, muszą się dotykać bokami 
5. Ładne rysowanie 








1. budynki oraz gracz rozdają zadania,
    const todo: [ tartak, kamieniołom, hataMyśliwego ]
    tartak potrezbuje drzew więc daje zadanie: zetnij drzewa

*/
