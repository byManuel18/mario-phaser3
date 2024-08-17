import { GAME_SCALE } from "../config";
import { SCREENHEIGHT } from "../main";
import { AUDIO } from "../scenes/audio/audio";
import { GlobalScene } from "../scenes/class/globalScene.class";
import { ANIMATIONS } from "./config/animations";
import { SPRITES } from "./config/sprites";
import { Enemy } from "./enemy";

export class Goomba extends Enemy {
  velocity: number = 100;
  isDead: boolean = false;

  constructor(scene: GlobalScene, x: number, y: number) {
    super(scene, x, y, SPRITES.goomba.key, false, 900);

    this.anims.play(ANIMATIONS.goomba.walk);

    this.velocity = scene.player.x > x ? this.velocity : -this.velocity;

    this.setVelocityX(this.velocity);
  }

  public moveEnemy(): void {
    if (this.isDead) return;

    if (
      this.y > SCREENHEIGHT + this.texture.get(1).cutHeight * GAME_SCALE ||
      this.x < 0 ||
      this.x > this.scene.physics.world.bounds.right
    ) {
      this.isDead = true;
      this.destroy();
    } else {
      this.setVelocityX(this.velocity);
    }
  }

  public killEnemy(): void {
    this.isDead = true;
    this.disableBody(true);
    this.scene.sound.play(AUDIO.goombaStomp.key, { loop: false, volume: 0.5 });
    this.anims.play(ANIMATIONS.goomba.dead);
    this.setVelocityX(0);

    this.scene.time.delayedCall(500,()=>{
        this.destroy();
    },[],this);

  }

  changeDirectionEnemy(){
    this.velocity = -this.velocity;
  }
}
