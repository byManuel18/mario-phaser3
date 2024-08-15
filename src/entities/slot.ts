import { GAME_SCALE } from "../config";

export class Slot extends Phaser.GameObjects.GameObject {
  private maxItem: number = 0;
  private currentItems: number = 0;

  private item: Phaser.GameObjects.Image | null = null;
  private backGroundImg: Phaser.GameObjects.Image;
  private zone: Phaser.GameObjects.Zone | null = null;
  private text: Phaser.GameObjects.Text | null = null;

  private index: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    index: number,
    item: Phaser.GameObjects.Image | null = null,
    currentItems: number = 0,
    maxItems: number = 1,
    width?: number,
    height?: number
  ) {
    super(scene, "Slot");

    this.backGroundImg = scene.add
      .image(x, y, "slot", 1)
      .setOrigin(0)
      .setScale(GAME_SCALE);
    this.item = item;
    this.currentItems = currentItems;
    this.maxItem = maxItems;
    this.index = index;

    if (this.item) {
      this.item
        .setScale(GAME_SCALE * 0,5)
        .setInteractive({ draggable: true })
        .setDataEnabled()
        .setOrigin(0.5,0.5)
        .setData("slot", this);
    }

    this.zone = scene.add
      .zone(
        x,
        y,
        this.backGroundImg.frame.cutWidth * GAME_SCALE,
        this.backGroundImg.frame.cutWidth * GAME_SCALE
      )
      .setOrigin(0, 0)
      .setRectangleDropZone(
        this.backGroundImg.frame.cutWidth * GAME_SCALE,
        this.backGroundImg.frame.cutWidth * GAME_SCALE
      )
      .setDataEnabled()
      .setData("slot", this);

    this.text = scene.add
      .text(this.zone.x, this.zone.y, this.currentItems.toString())
      .setDepth(1)
      .setScale(GAME_SCALE * 0.5);

    if (scene.physics.getConfig().debug) {
      scene.add
        .graphics()
        .lineStyle(2, 0xffff00)
        .strokeRect(
          this.zone.x + this.zone.input?.hitArea.x,
          this.zone.y + this.zone.input?.hitArea.y,
          this.zone.input?.hitArea.width,
          this.zone.input?.hitArea.height
        );
    }
  }

  public canAddItem(item: Phaser.Textures.Texture): boolean {
    return (
      this.currentItems < this.maxItem &&
      (this.item === null || this.item.texture.key === item.key)
    );
  }

  public addItem(item: Phaser.Textures.Texture, count: number = 1): void {
    if (this.canAddItem(item)) {
      if (!this.item) {
        this.buildImg(item);
      }
      this.currentItems += count;
      this.updateText();
    }
  }

  public removeItem(
    item: Phaser.Textures.Texture,
    removeAll: boolean = false
  ): void {
    if (this.item && item.key === this.item.texture.key) {
      if (removeAll) {
        this.currentItems = 0;
      } else {
        this.currentItems--;
      }
      this.updateText();
      if (!this.currentItems) {
        this.item.destroy();
        this.item = null;
      }
    }
  }

  private updateText() {
    this.text?.setText(this.currentItems.toString());
  }

  get getCountItems() {
    return this.currentItems;
  }

  get getIndex() {
    return this.index;
  }

  get slotConfig(): {
    item: Phaser.Textures.Texture | null;
    maxItem: number;
    currentItems: number;
  } {
    return {
      item: this.item ? this.item?.texture : null,
      maxItem: this.maxItem,
      currentItems: this.currentItems,
    };
  }

  set slotConfig(config: {
    item: Phaser.Textures.Texture | null;
    maxItem: number;
    currentItems: number;
  }) {
    this.item?.destroy();
    this.item = null;
    this.maxItem = config.maxItem;
    this.currentItems = config.currentItems;
    if (config.item) {
      this.buildImg(config.item);
    }
    this.updateText();
  }

  private buildImg(item: Phaser.Textures.Texture) {
    console.log(item.get(0).cutHeight);
    console.log(item.get(0).cutWidth);

    const cutH = this.zone!.input?.hitArea.height / 2;
    const cutW =  this.zone!.input?.hitArea.width / 2;;
    
    this.item = this.scene.add
      .image(this.zone!.x + cutW, this.zone!.y + cutH, item)
      .setOrigin(0.5,0.5)
      .setScale(GAME_SCALE * 0.5)
      .setInteractive({ draggable: true })
      .setDataEnabled()
      .setData("slot", this);
    this.scene.input.setDraggable(this.item);
  }
}
