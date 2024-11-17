import { GAME_SCALE } from "../config";
import { Player } from "../interfaces/player.interface";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { AUDIO } from "../scenes/audio/audio";
import { GlobalScene } from "../scenes/class/globalScene.class";
import { ANIMATIONS } from "./config/animations";
import { SPRITES } from "./config/sprites";
import { Enemy } from "./enemy";
import { FireBall } from "./fireBall";

export class Mario extends Phaser.Physics.Arcade.Sprite {
  private playerData: Player = {
    life: 5,
    bloked: false,
    state: "mini",
    speed: (SCREENWIDTH / 10) * GAME_SCALE,
    jumpForce: 250 * GAME_SCALE,
    gravity: 300 * GAME_SCALE,
    cdFireball: 500,
  };

  private keys?: Phaser.Types.Input.Keyboard.CursorKeys;

  private floorCollider?: Phaser.Physics.Arcade.Collider;
  private enemysCollider?: Phaser.Physics.Arcade.Collider;
  private canShootFireBall: boolean = true;

  constructor(scene: GlobalScene, x: number, y: number) {
    super(scene, x, y, SPRITES.mario.key);

    scene.physics.world.setBoundsCollision(true, true, true, false);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0, 1);
    this.setGravityY(this.playerData.gravity);
    this.setCollideWorldBounds(true);
    this.setScale(GAME_SCALE, GAME_SCALE);
    this.setDepth(1);

    this.keys = scene.input.keyboard?.createCursorKeys();

    scene.cameras.main.setBounds(0, 0, scene.widthScene, scene.heightScene);
    scene.cameras.main.startFollow(this);

    this.setListener();
  }

  move() {
    if (
      this.playerData.bloked ||
      !this.playerData.life ||
      this.scene.scene.isPaused()
    )
      return;

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
      this.scene.sound.play(AUDIO.marioJump.key, { volume: 0.05 });
      this.setVelocityY(-this.playerData.jumpForce);
    }

    if (!this.body?.touching.down) {
      this.anims.play(ANIMATIONS.mario.jump.key, true);
    }

    if (this.y > SCREENHEIGHT + 32) {
      this.killMario();
    }
  }

  hitMario() {
    //TODO de momento así
    this.killMario();
  }

  private killMario() {
    this.playerData.bloked = true;
    if (this.floorCollider) {
      this.floorCollider.active = false;
    }
    if (this.enemysCollider) {
      this.enemysCollider.active = false;
    }
    this.anims.play(ANIMATIONS.mario.dead.key);
    this.setVelocityY(-this.playerData.jumpForce);
    this.setVelocityX(0);
    this.scene.sound.stopAll();
    this.scene.sound.play(AUDIO.dead.key, { loop: false, volume: 0.5 });
    this.playerData.life--;

    this.scene.time.delayedCall(
      3000,
      () => {
        this.scene.sound.stopAll();
        this.scene.scene.restart();
        //TODO AL QUITAR VIDAS TERMINAR GAME NO REINICIAR
      },
      [],
      this
    );
  }

  setFloorCollider(floor: Phaser.Physics.Arcade.StaticGroup) {
    this.floorCollider = this.scene.physics.add.collider(this, floor);
  }

  setEnemysCollider(enemys: Phaser.Physics.Arcade.Group) {
    this.enemysCollider = this.scene.physics.add.collider(
      this,
      enemys,
      (mario, enemy) => {
        const { left, right, down, up } = (mario as Mario).body!.touching;
        if (left || right || up) {
          this.hitMario();
        } else if (down) {
          if (enemy instanceof Enemy) {
            this.setVelocityY(-this.playerData.jumpForce / 2);
            enemy.killEnemy();
          }
        }
      }
    );
  }

  get getDataPlayer() {
    return { ...this.playerData };
  }

  set setDataPlayer(data: Player) {
    this.playerData = { ...data };
  }

  private setListener() {
    this.scene.input.keyboard?.on("keydown-X", () => {
      if (!this.canShootFireBall) {
        return;
      }
      this.canShootFireBall = false;

      const newFireBall = new FireBall(
        this.scene as GlobalScene,
        this.x,
        this.y
      );

      this.scene.time.delayedCall(this.playerData.cdFireball, () => {
        this.canShootFireBall = true;
      });
    });
  }
}
