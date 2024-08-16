import { SCENES } from "../config/scenes.config";
import { UiScene } from "../interfaces/ui.interface";


export abstract class GlobalSceneUI extends Phaser.Scene implements UiScene{
    abstract parentScene: SCENES;
    
}