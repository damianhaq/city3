import { GAME } from "../consts.js";
import { drawRectOnMap } from "../DGamev3.js";

export class Resource {
  constructor(resource, game) {
    this.name = resource.name;
    this.id = resource.id;
    this.drawCallback = resource.drawCallback;

    this.game = game;

    this.isOutline = false;

    this.#isValid(resource);
  }

  // check if resource object have all the required properties and if not log an error
  #isValid(resource) {
    if (!resource.name) {
      console.log("Resource object must have a name property", resource);
    }

    if (!resource.id) {
      console.log("Resource object must have an id property", resource);
    }

    if (!resource.drawCallback) {
      console.log(
        "Resource object must have a drawCallback property",
        resource
      );
    }

    if (resource.collidable === undefined) {
      console.log("Resource object must have a collidable property", resource);
    }

    return true;
  }

  draw(x, y) {
    // draw outline
    if (this.isOutline)
      drawRectOnMap(
        x * GAME.cellLength + 1,
        y * GAME.cellLength + 1,
        GAME.cellLength - 2,
        GAME.cellLength - 2,
        this.game.ctx,
        this.game.camera
      );

    // draw resource
    this.drawCallback(x, y);
  }
}
