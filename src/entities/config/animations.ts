import { SPRITES } from "./sprites";

export const ANIMATIONS = {
    mario: {
        walk: {
            key: 'mario-walk',
            frameRate: 12,
            sprite: {
                key: SPRITES.mario.key,
                start: 1,
                end: 3,
                frameRate: 12
            }
        },
        idle: {
            key: 'mario-idle',
            frameRate: 12,
            sprite: {
                key: SPRITES.mario.key,
                start: 0,
                end: 0,
                frameRate: 12
            }
        },
        jump: {
            key: 'mario-jump',
            frameRate: 12,
            sprite: {
                key: SPRITES.mario.key,
                start: 5,
                end: 5,
                frameRate: 12
            }
        },

        dead: {
            key: 'mario-dead',
            frameRate: 12,
            sprite: {
                key: SPRITES.mario.key,
                start: 4,
                end: 4,
                frameRate: 12
            }
        }
      
    }
}
