import { GAME_SCALE } from "../config";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { generarUUID } from "../scenes/utils/generarUUID";
import { Slot } from "./slot";

export class Inventory {
  private colums: number = 0;
  private rows: number = 0;
  private maxItem: number = 0;
  private selectedSlot: number = -1;

  private uuid: string;

  private inventory: Slot[] = [];

  private scene: Phaser.Scene;

  private inventroyKey?: Phaser.Input.Keyboard.Key;

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

    // this.inventory[0].addItem(this.scene.textures.get("mushroom"));
    // this.inventory[4].addItem(this.scene.textures.get("mushroom"));
    // this.inventory[2].addItem(this.scene.textures.get("mushroom-live"));
    // this.inventory[3].addItem(this.scene.textures.get("mushroom-live"));
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
        gameObject.setAlpha(1);
        if (!dropped) {
          gameObject.x = gameObject.input!.dragStartX;
          gameObject.y = gameObject.input!.dragStartY;
        }
      }
    );

    scene.input.on(
      "wheel",
     (
        pointer: Phaser.Input.Pointer,
        gameObjects: any,
        deltaX: number,
        deltaY: number,
        deltaZ: number
      )=>{
        let isScroll = false;
        if (deltaY > 0) {
          this.selectedSlot--;
          if(0 > this.selectedSlot ){
            this.selectedSlot = this.inventory.length - 1;
          } 
          isScroll = true;
        } else if (deltaY < 0) {
          this.selectedSlot++;
          if(this.inventory.length -1 < this.selectedSlot ){
            this.selectedSlot = 0;
          } 
          isScroll = true;
        }

        if(isScroll){
          this.changeSelectedSlot();
        }
      }
    );

    this.inventroyKey = scene.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    scene.events.on('update',()=>{
      if (Phaser.Input.Keyboard.JustDown(this.inventroyKey!)) {
        const slot: Slot = this.inventory[this.selectedSlot];
        if(slot && slot.getCountItems > 0){
          slot.useItems(1);
        }
      }
      
    });
  }

  private flipSlot(slotA: Slot, slotB: Slot) {
    const configSlotA = slotA.slotConfig;
    const configSlotB = slotB.slotConfig;

    slotA.slotConfig = configSlotB;
    slotB.slotConfig = configSlotA;
  }

  public addItemToInventory(
    item: Phaser.Textures.Texture,
    count: number = 1
  ): boolean {
    let added: boolean = false;

    const slotSelected: Slot | undefined =
      this.inventory.find(
        (slot) => slot.itemKey === item.key && slot.canAddItem(item)
      ) || this.inventory.find((slot) => slot.canAddItem(item));

    if (slotSelected) {
      slotSelected.addItem(item, count);
    }

    return added;
  }

  private changeSelectedSlot(){
    this.inventory.forEach(slot=>{
      if(slot.getIndex === this.selectedSlot){
        slot.toggleSelected(true);
      }else{
        slot.toggleSelected();
      }
    })
  }
}
