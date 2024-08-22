import { Mario } from "../entities/mario";
import { SCENES } from "./config/scenes.config";
import { SPRITES } from "../entities/config/sprites";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { AUDIO } from "./audio/audio";
import { GAME_SCALE } from "../config";
import { floorBuilder } from "./utils/floorBuilder";
import { MAP_LEVEL_ONE } from "./data/maps";
import { GlobalScene } from "./class/globalScene.class";
import { Goomba } from "../entities/goomba";
import { Enemy } from "../entities/enemy";
import { Block } from "../scenary/block";

export class LevelOne extends GlobalScene {
  player!: Mario;
  mainAudio?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  widthScene: number = (SCREENWIDTH * 2) * GAME_SCALE;
  heightScene: number = SCREENHEIGHT;

  enemys?: Phaser.Physics.Arcade.Group;

  constructor() {
    super(SCENES.LEVEL_ONE);
  }

  preload(): void {
    this.loadSprites();
  }

  create(): void {

    this.physics.world.setBounds(0, 0, this.widthScene , this.heightScene);

    this.mainAudio = this.sound.add(AUDIO.overworldTheme.key, {
      loop: true,
      volume: 0.2,
    });

    const floor = this.physics.add.staticGroup();
    this.enemys = this.physics.add.group();

    floorBuilder(floor, MAP_LEVEL_ONE, { x: 0, y: SCREENHEIGHT });

    this.player = new Mario(this, 100, SCREENHEIGHT - 32 * GAME_SCALE);

    this.player.setFloorCollider(floor);

    this.enemys.add(new Goomba(this, 855, SCREENHEIGHT - 16 * GAME_SCALE));
    this.enemys.add(new Goomba(this, 950, SCREENHEIGHT - 16 * GAME_SCALE));
    
    this.player.setEnemysCollider(this.enemys);

    this.physics.add.collider(this.enemys, floor, (enemy, obj)=>{
     Enemy.setFloorCallBackCollider(enemy as Enemy, obj as Block);
    });

    this.physics.add.collider(this.enemys, this.enemys, (enemy1, enemy2) => {
     Enemy.setEnemyCallBackCollider(enemy1 as Enemy, enemy2 as Enemy);
    });
    
    
    this.mainAudio.play(); 

    this.scene.launch(SCENES.UISCENE,{parentScene: SCENES.LEVEL_ONE});

  }

  update(time: number, delta: number): void {
   this.player.move();
   Phaser.Actions.Call(this.enemys?.getChildren() || [],(enemy)=>{
    if(enemy instanceof Enemy){
      enemy.moveEnemy();
      if(enemy.isDead){
        this.enemys?.remove(enemy);
      }
    }
   },this);
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
