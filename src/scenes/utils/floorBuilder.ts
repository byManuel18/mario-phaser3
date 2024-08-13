import { GAME_SCALE } from "../../config";
import { BlockBuilder } from "../types/blockBuilder";

export const floorBuilder = (
    group: Phaser.Physics.Arcade.StaticGroup,
    map: (BlockBuilder | null)[][] = [],
    start: { x: number; y: number },
  ) :void=>{
    let heightBlok = 0;
    let widhtBlok = 0;

    for (let i = map.length - 1; i >= 0; i--) {
      const ystart = start.y -(heightBlok * GAME_SCALE) * (map.length - 1 - i);

      for (let j = 0; j < map[i].length; j++) {
        const value: (BlockBuilder | null) = map[i][j];
        if (value) {
          const xstart = (widhtBlok * GAME_SCALE) * j + start.x;
          const objnew = new value(group.scene, xstart, ystart);
          heightBlok = objnew.SPRITE_HEIGHT;
          widhtBlok = objnew.SPRITE_WIDTH;
          group.add(objnew);
        }
      }
    }
}
