import { SPRITES } from "./sprites";

interface Animations {
  [key: string]: {
    [key: string]: Phaser.Types.Animations.PlayAnimationConfig;
  };
}

export const ANIMATIONS = {
  mario: {
    walk: {
      key: "mario-walk",
      frameRate: 12,
      sprite: {
        key: SPRITES.mario.key,
        start: 1,
        end: 3,
        frameRate: 12,
      },
    },
    idle: {
      key: "mario-idle",
      frameRate: 12,
      sprite: {
        key: SPRITES.mario.key,
        start: 0,
        end: 0,
        frameRate: 12,
      },
    },
    jump: {
      key: "mario-jump",
      frameRate: 12,
      sprite: {
        key: SPRITES.mario.key,
        start: 5,
        end: 5,
        frameRate: 12,
      },
    },

    dead: {
      key: "mario-dead",
      frameRate: 12,
      sprite: {
        key: SPRITES.mario.key,
        start: 4,
        end: 4,
        frameRate: 12,
      },
    },
  },

  goomba: {
    walk: {
      key: "goomba-walk",
      frameRate: 6,
      sprite: {
        key: SPRITES.goomba.key,
        start: 0,
        end: 1,
        frameRate: 12,
      },
    },
    dead: {
      key: "goomba-dead",
      frameRate: 6,
      sprite: {
        key: SPRITES.goomba.key,
        start: 2,
        end: 2,
        frameRate: 12,
      },
    },
  },

  fireball: {
    throw: {
      key: "fireball-throw",
      frameRate: 8,
      sprite: {
        key: SPRITES.fireBall.key,
        start: 0,
        end: 3,
        frameRate: 12,
      },
    },

    explosion: {
      key: "fireball-explosion",
      frameRate: 16,
      sprite: {
        key: SPRITES.fireBallExplosion.key,
        start: 0,
        end: 2,
        frameRate: 12,
      },
      repeat: 0,
    },
  },
};
