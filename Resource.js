import { drawRectOnMap } from "./DGamev3.js";

export class Resource {
  constructor(name, id, map, game, drawCallback) {
    this.name = name;
    this.id = id;
    this.drawCallback = drawCallback;
    this.map = map;
    this.game = game;

    this.isOutline = false;
  }

  draw(x, y) {
    // draw outline
    if (this.isOutline)
      drawRectOnMap(
        x * this.map.cellLength + 1,
        y * this.map.cellLength + 1,
        this.map.cellLength - 2,
        this.map.cellLength - 2,
        this.game.ctx,
        this.game.camera
      );

    // draw resource
    this.drawCallback(x, y);
  }
}
