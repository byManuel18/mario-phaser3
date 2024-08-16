import { Inventory } from "../../entities/intentory";
import { GlobalSceneUI } from "../class/globalSceneUi.class";
import { SCENES } from "../config/scenes.config";
import { UiScene } from "../interfaces/ui.interface";


export class UIScene extends GlobalSceneUI {

    parentScene!: SCENES;

    constructor() {
        super({ key: SCENES.UISCENE });
    }

    create() {
        const setings = this.scene.settings.data as UiScene;

        this.parentScene = setings.parentScene;
        

        const newInventory = new Inventory(this,2,3,64);

        setTimeout(()=>{
          newInventory.addItemToInventory(this.textures.get('mushroom-live'));
          newInventory.addItemToInventory(this.textures.get('mushroom-live'));
        },5000)
        
    }
}