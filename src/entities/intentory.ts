import { GAME_SCALE } from "../config";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { generarUUID } from "../scenes/utils/generarUUID";
import { Slot } from "./slot";

export class Inventory {
  private colums: number = 0;
  private rows: number = 0;
  private maxItem: number = 0;

  private uuid: string;

  private inventory: Slot[] = [];

  private scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    colums: number,
    rows: number,
    maxItem: number,
    uuid?: string
  ) {
    if (uuid) {
      this.uuid = uuid;
    } else {
      this.uuid = generarUUID();
    }

    this.colums = colums;
    this.rows = rows;
    this.maxItem = maxItem;
    this.scene = scene;

    this.generateInventory(scene);
    this.setListenner(scene);
  }

  private generateInventory(scene: Phaser.Scene) {
    let index = 0;
    const slotWidth = 16 * GAME_SCALE + 10;
    const inventoryWidth = this.rows * slotWidth; 
    const inventoryHeight = this.colums * slotWidth; 

    const offsetX = (SCREENWIDTH - inventoryWidth) / 2;
    const offsetY = (SCREENHEIGHT - inventoryHeight) / 2;

    for (let c = 0; c < this.colums; c++) {
      for (let r = 0; r < this.rows; r++) {
        const x = offsetX + r * slotWidth;
        const y = offsetY + c * slotWidth;
        this.inventory.push(
          new Slot(scene, x, y, index, null, 0, this.maxItem)
        );
        index++;
      }
    }

    this.inventory[0].addItem(this.scene.textures.get("mushroom"));
    this.inventory[4].addItem(this.scene.textures.get("mushroom"));
    this.inventory[2].addItem(this.scene.textures.get("mushroom-live"));
    this.inventory[3].addItem(this.scene.textures.get("mushroom-live"));
  }

  private setListenner(scene: Phaser.Scene) {
    scene.input.on(
      "dragstart",
      (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        gameObject.setAlpha(0.5);
      }
    );

    scene.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: any,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    scene.input.on(
      "drop",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        dropZone: Phaser.GameObjects.Zone
      ) => {
        gameObject.setAlpha(1);

        const curretSlot: Slot = gameObject.getData("slot");
        const nextSlot: Slot = dropZone.getData("slot");

        if (curretSlot.getIndex === nextSlot.getIndex) {
          gameObject.x = gameObject.input!.dragStartX;
          gameObject.y = gameObject.input!.dragStartY;
        } else {
          if (nextSlot.canAddItem(gameObject.texture)) {
            nextSlot.addItem(gameObject.texture, curretSlot.getCountItems);
            curretSlot.removeItem(gameObject.texture, true);

            // const dropZOneCenterX = dropZone.x;
            // const dropZoneCenterY = dropZone.y;
            // gameObject.x = dropZOneCenterX;
            // gameObject.y = dropZoneCenterY;
          } else {
            this.flipSlot(curretSlot, nextSlot);
          }
        }
      }
    );

    scene.input.on(
      "dragend",
      function (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        dropped: any
      ) {
        gameObject.setAlpha(1); // Restaurar la opacidad del objeto
        if (!dropped) {
          gameObject.x = gameObject.input!.dragStartX;
          gameObject.y = gameObject.input!.dragStartY;
        }
      }
    );
  }

  private flipSlot(slotA: Slot, slotB: Slot) {
    const configSlotA = slotA.slotConfig;
    const configSlotB = slotB.slotConfig;

    slotA.slotConfig = configSlotB;
    slotB.slotConfig = configSlotA;
  }
}
