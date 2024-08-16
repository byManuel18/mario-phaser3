import { Mario } from "../../entities/mario";
import { CustomScene } from "../interfaces/customScene.interface";

export abstract class GlobalScene extends Phaser.Scene implements CustomScene {
    
    abstract player: Mario;
    abstract mainAudio?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | undefined;
    
    constructor(config?: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
}