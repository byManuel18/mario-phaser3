import { GAME_SCALE } from "../config";
import { IEnemy } from "../interfaces/enemy.interface";
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
}
