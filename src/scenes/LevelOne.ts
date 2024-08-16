import { Mario } from "../entities/mario";
import { SCENES } from "./config/scenes.config";
import { SPRITES } from "../entities/config/sprites";
import { SCREENHEIGHT } from "../main";
import { AUDIO } from "./audio/audio";
import { GAME_SCALE } from "../config";
import { floorBuilder } from "./utils/floorBuilder";
import { MAP_LEVEL_ONE } from "./data/maps";
import { Inventory } from "../entities/intentory";
import { GlobalScene } from "./class/globalScene.class";

export class LevelOne extends GlobalScene {
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

    floorBuilder(this.floor, MAP_LEVEL_ONE, { x: 0, y: SCREENHEIGHT });

    this.player = new Mario(this, 100, SCREENHEIGHT - 32 * GAME_SCALE);

    this.physics.add.collider(this.player, this.floor);

    this.mainAudio.play();
    
    const newInventory = new Inventory(this,2,3,64);

    setTimeout(()=>{
      newInventory.addItemToInventory(this.textures.get('mushroom-live'));
      newInventory.addItemToInventory(this.textures.get('mushroom-live'));
    },5000)

  }

  update(time: number, delta: number): void {
   
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
