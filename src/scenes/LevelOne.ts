import { Mario } from "../entities/mario";
import { SCENES } from "./config/scenes.config";
import { SPRITES } from "../entities/config/sprites";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { AUDIO } from "./audio/audio";
import { GAME_SCALE } from "../config";
import { floorBuilder } from "./utils/floorBuilder";
import { MAP_LEVEL_ONE } from "./data/maps";
import { GlobalScene } from "./class/globalScene.class";

export class LevelOne extends GlobalScene {
  player!: Mario;
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

    const WIDTH_LEVEL = (SCREENWIDTH * 2) * GAME_SCALE;

    this.physics.world.setBounds(0, 0, WIDTH_LEVEL , SCREENHEIGHT);

    this.mainAudio = this.sound.add(AUDIO.overworldTheme.key, {
      loop: true,
      volume: 0.2,
    });

    this.floor = this.physics.add.staticGroup();

    floorBuilder(this.floor, MAP_LEVEL_ONE, { x: 0, y: SCREENHEIGHT });

    this.player = new Mario(this, 100, SCREENHEIGHT - 32 * GAME_SCALE);

    this.physics.add.collider(this.player, this.floor);

    this.mainAudio.play(); 
    
    this.cameras.main.setBounds(0, 0, WIDTH_LEVEL, SCREENHEIGHT);
    this.cameras.main.startFollow(this.player);
    
    this.scene.launch(SCENES.UISCENE,{parentScene: SCENES.LEVEL_ONE});

  }

  update(time: number, delta: number): void {
   this.player.move();
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
