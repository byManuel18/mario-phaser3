import { Mario } from "../entities/mario";
import { SCENES } from "./config/scenes.config";
import { SPRITES } from "../entities/config/sprites";
import { SCREENHEIGHT } from "../main";
import { AUDIO } from "./audio/audio";
import { BlockBuilder } from "./types/blockBuilder";
import { GAME_SCALE } from "../config";
import { Brik } from "../scenary/brik";
import { floorBuilder } from "./utils/floorBuilder";

export class LevelOne extends Phaser.Scene {
  player?: Mario;
  floor?: Phaser.Physics.Arcade.StaticGroup;
  mainAudio?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  constructor() {
    super(SCENES.LEVEL_ONE);
  }

  preload(): void {
    this.loadSprites();
  }

  create(): void {
    this.mainAudio = this.sound.add(AUDIO.overworldTheme.key, {
      loop: true,
      volume: 0.2,
    });

    this.floor = this.physics.add.staticGroup();

    const map: (BlockBuilder | null)[][] = [
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        Brik,
        Brik,
        null,
        null,
        null,
        null,
        Brik,
        Brik,
        null,
      ],
      [
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        null,
        null,
        null,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
        Brik,
      ],
    ];

    floorBuilder(this.floor, map, { x: 0, y: SCREENHEIGHT });

    this.player = new Mario(this, 100, SCREENHEIGHT - 32 * GAME_SCALE);

    this.physics.add.collider(this.player, this.floor);

    this.mainAudio.play();
  }

  update(time: number, delta: number): void {
    this.player?.move();
  }

  private loadSprites() {
    const {
      key,
      path,
      frames: { frameHeight, frameWidth },
    } = SPRITES.briks;

    this.load.spritesheet(key, path, { frameWidth, frameHeight });
  }
}
