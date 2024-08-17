import { Mario } from "../../entities/mario";

export interface CustomScene{
    player: Mario,
    mainAudio?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
    widthScene: number;
    heightScene: number;


}
