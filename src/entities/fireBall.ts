import { GAME_SCALE } from "../config";
import { GlobalScene } from "../scenes/class/globalScene.class";
import { ANIMATIONS } from "./config/animations";
import { SPRITES } from "./config/sprites";
import { Enemy } from "./enemy";

export class FireBall extends Phaser.Physics.Arcade.Sprite {
  velocity: number = 350;
  life: number = 5000;
  isDead: boolean = false;
  lifeEvent?: Phaser.Time.TimerEvent;

  constructor(scene: GlobalScene, x: number, y: number) {
    super(scene, x, y, SPRITES.fireBall.key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.on(
      "animationcomplete",
      (
        animation: Phaser.Animations.Animation,
        frame: Phaser.Animations.AnimationFrame,
        fireBall: FireBall
      ) => {
        if (animation.key === ANIMATIONS.fireball.explosion.key) {
          fireBall.disableBody(true);
          fireBall.destroy();
        }
      }
    );

    this.velocity = !scene.player.flipX ? this.velocity : -this.velocity;

    this.setScale(GAME_SCALE, GAME_SCALE);
    this.setOrigin(0, 1);
    this.setGravityY(300 * GAME_SCALE);

    this.anims.play(ANIMATIONS.fireball.throw);

    this.setVelocityX(this.velocity);
    this.setVelocityY(-Math.abs(this.velocity));

    this.setColliders();

    this.setLifeTimer();
  }

  private setColliders() {
    const { floor, enemys } = this.scene as GlobalScene;
    if (floor) {
      this.scene.physics.add.collider(this, floor, (fireBall, block) => {
        const { left, right, down, up } = (fireBall as FireBall).body!.touching;
        if (down && !left && !right && !up) {
          return this.setVelocityY(-Math.abs(this.velocity));
        }

        if (left || right || up) {
          this.killFireBall();
        }
      });
    }

    if (enemys) {
      this.scene.physics.add.collider(this, enemys, (fireBall, enemy) => {
        const { isDead } = fireBall as FireBall;
        if (!isDead) {
          (enemy as Enemy).killEnemy();
          this.killFireBall();
        }
      });
    }
  }

  private setLifeTimer() {
    this.lifeEvent = this.scene.time.delayedCall(this.life, () => {
      if (!this.isDead) {
        this.killFireBall();
      }
    });
  }

  killFireBall() {
    if (this.isDead) {
      return;
    }
    this.anims.stop();
    this.play(ANIMATIONS.fireball.explosion.key);
    this.lifeEvent?.destroy();
    this.setGravity(0);
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.isDead = true;
  }
}
