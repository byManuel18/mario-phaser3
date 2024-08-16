import { Mario } from "../../entities/mario";
import { CustomScene } from "../interfaces/customScene.interface";

export abstract class GlobalScene extends Phaser.Scene implements CustomScene {
    
    player!: Mario;
    
    constructor(config?: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
}