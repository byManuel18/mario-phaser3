import { SPRITES } from "./../entities/config/sprites";
import { ANIMATIONS } from "../entities/config/animations";
import { AUDIO } from "./audio/audio";
import { SCENES } from "./config/scenes.config";
import { IMAGES } from "../entities/config/images";

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

    document.querySelector('#loadingScreen')?.remove()
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
          repeat,
        } = animations[keyAnimConst as keyof typeof animations];

        this.anims.create({
          key: key,
          frames: this.anims.generateFrameNumbers(keyAnim, {
            start,
            end,
          }),
          frameRate,
          repeat: repeat !== undefined ? repeat : -1,
        });
      });
    });
  }

  private loadAudio() {
    Object.keys(AUDIO).forEach((keyAudio) => {
      const { key, path } = AUDIO[keyAudio as keyof typeof AUDIO];
      this.load.audio(key, path);
    });
  }

  private loadImages() {
    Object.keys(IMAGES).forEach((keyImage) => {
      const { key, path } = IMAGES[keyImage as keyof typeof IMAGES];
      this.load.image(key, path);
    });
  }
}
