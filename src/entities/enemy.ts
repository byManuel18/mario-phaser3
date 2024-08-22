import { GAME_SCALE } from "../config";
import { IEnemy } from "../interfaces/enemy.interface";
import { Block } from "../scenary/block";
import { GlobalScene } from "../scenes/class/globalScene.class";

export abstract class Enemy
  extends Phaser.Physics.Arcade.Sprite
  implements IEnemy
{
  abstract velocity: number;
  abstract isDead: boolean;

  constructor(
    scene: GlobalScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    worldBounds: boolean = false,
    gravity?: number
  ) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0, 1);
    if (gravity) {
      this.setGravityY(gravity);
    }

    this.setScale(GAME_SCALE, GAME_SCALE);
    this.setCollideWorldBounds(worldBounds);
  }

  abstract moveEnemy(): void;
  abstract killEnemy(): void;

  changeDirectionEnemy() {
    this.velocity = -this.velocity;
  }

  public static setFloorCallBackCollider(enemy: Enemy, block: Block) {
    const { left, right } = enemy.body!.touching;
    const { left: leftBlock, right: rightBlock } = block.body!.touching;
    if ((left && rightBlock) || (right && leftBlock)) {
      enemy.changeDirectionEnemy();
    }
  }

  public static setEnemyCallBackCollider(enemya: Enemy, enemyb: Enemy) {
    const { left, right } = enemya.body!.touching;
    const { left: leftGoomba, right: rightGoomba } = enemyb.body!.touching;
    if ((left && rightGoomba) || (right && leftGoomba)) {
      enemya.changeDirectionEnemy();
      enemyb.changeDirectionEnemy();
    }
  }
}
