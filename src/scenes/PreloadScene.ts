import { SPRITES } from "./../entities/config/sprites";
import { ANIMATIONS } from "../entities/config/animations";
import { AUDIO } from "./audio/audio";
import { SCENES } from "./config/scenes.config";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PRELOAD);
  }

  preload(): void {
    this.loadSprites();
    this.loadAudio();
    this.loadImages();
  }

  create(): void {
    this.createAnimations();

    this.scene.start(SCENES.LEVEL_ONE);
  }

  private loadSprites() {
    Object.keys(SPRITES).forEach((keyConst) => {
      const {
        key,
        frames: { frameHeight, frameWidth },
        path,
      } = SPRITES[keyConst as keyof typeof SPRITES];
      this.load.spritesheet(key, path, { frameWidth, frameHeight });
    });
  }

  private createAnimations() {
    Object.keys(ANIMATIONS).forEach((keyConst) => {
      const animations = ANIMATIONS[keyConst as keyof typeof ANIMATIONS];
      Object.keys(animations).forEach((keyAnimConst) => {
        const {
          key,
          sprite: { key: keyAnim, end, start },
          frameRate,
        } = animations[keyAnimConst as keyof typeof animations];

        this.anims.create({
          key: key,
          frames: this.anims.generateFrameNumbers(keyAnim, {
            start,
            end,
          }),
          frameRate,
          repeat: -1,
        });
      });
    });
  }

  private loadAudio() {
    Object.keys(AUDIO).forEach((keyAudio) => {
      const { key, path } = AUDIO[keyAudio as keyof typeof Audio];
      this.load.audio(key, path);
    });
  }

  private loadImages() {
    this.load.image("mushroom", "../../assets/collectibles/super-mushroom.png");
    this.load.image(
      "mushroom-live",
      "../../assets/collectibles/live-mushroom.png"
    );
    this.load.image("slot", "../../assets/mine/slot.png");
  }
}
