import { Types } from "phaser";
import { LevelOne } from "./scenes/LevelOne";
import { PreloadScene } from "./scenes/PreloadScene";

export const getConfig = (
  height: number,
  width: number
): Types.Core.GameConfig => {
  return {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: [PreloadScene, LevelOne],
    parent: "game",
    backgroundColor: '#049cd8',
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
        gravity: { y: 300, x: 0 },
      },
    },
  };
};


export const GAME_SCALE = 2;
