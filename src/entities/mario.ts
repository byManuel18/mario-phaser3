import { GAME_SCALE } from "../config";
import { Player } from "../interfaces/player.interface";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { AUDIO } from "../scenes/audio/audio";
import { GlobalScene } from "../scenes/class/globalScene.class";
import { CustomEvents } from "../scenes/config/customEvents";
import { ANIMATIONS } from "./config/animations";
import { SPRITES } from "./config/sprites";

export class Mario extends Phaser.Physics.Arcade.Sprite {
  private playerData: Player = {
    life: 5,
    bloked: false,
    state: "mini",
    speed: (SCREENWIDTH / 10) * GAME_SCALE,
    jumpForce: 250 * GAME_SCALE,
    gravity: 300 * GAME_SCALE,
  };

  private keys?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: GlobalScene, x: number, y: number) {
    super(scene, x, y, SPRITES.mario.key);

    scene.physics.world.setBoundsCollision(true, true, true, false);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.setOrigin(0, 1);
    this.setGravityY(this.playerData.gravity);
    this.setCollideWorldBounds(true);
    this.setScale(GAME_SCALE, GAME_SCALE);

    this.keys = scene.input.keyboard?.createCursorKeys();

    scene.cameras.main.setBounds(0, 0, scene.widthScene, scene.heightScene);
    scene.cameras.main.startFollow(this);

    this.setListener();
  }

  move() {
    if (this.playerData.bloked || !this.playerData.life) return;

    switch (true) {
      case this.keys?.right.isDown:
        this.setVelocityX(this.playerData.speed);
        this.flipX = false;
        this.body?.touching.down &&
          this.anims.play(ANIMATIONS.mario.walk.key, true);
        break;
      case this.keys?.left.isDown:
        this.setVelocityX(-this.playerData.speed);
        this.flipX = true;
        this.body?.touching.down &&
          this.anims.play(ANIMATIONS.mario.walk.key, true);
        break;
      default:
        this.setVelocityX(0);
        this.body?.touching.down &&
          this.anims.play(ANIMATIONS.mario.idle.key, true);
    }

    if (this.keys?.space.isDown && this.body?.touching.down) {
      this.scene.sound.play(AUDIO.marioJump.key, {volume: 0.05});
      this.setVelocityY(-this.playerData.jumpForce);
      this.anims.play(ANIMATIONS.mario.jump.key, true);
    }

    if (this.y > SCREENHEIGHT) {
      this.killMario();
    }
  }

  hitMario() {}

  private killMario() {
    this.playerData.bloked = true;
    this.anims.play(ANIMATIONS.mario.dead.key);
    this.setVelocityY(-this.playerData.jumpForce);
    this.setVelocityX(0);
    this.scene.sound.stopAll();
    this.scene.sound.play(AUDIO.dead.key,{loop: false, volume: 0.5});
    this.playerData.life--;
    setTimeout(() => {
      this.playerData.bloked = false;
      this.scene.sound.stopAll();
      this.scene.scene.restart();

      //TODO AL QUITAR VIDAS TERMINAR GAME NO REINICIAR
    }, 3000);
  }

  get getDataPlayer() {
    return { ...this.playerData };
  }

  set setDataPlayer(data: Player) {
    this.playerData = { ...data };
  }

  private setListener(){
    this.scene.events.on(CustomEvents.START,(pause: boolean)=>{
      this.playerData.bloked = pause;
    })
  }
}
