import { AUDIO } from "../audio/audio";
import { CustomEvents } from "../config/customEvents";
import { GlobalScene } from "./globalScene.class";
import { GlobalSceneUI } from "./globalSceneUi.class";


export class HandlePause {

    pauseSong: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;


    constructor(scene: GlobalSceneUI){
        this.pauseSong = scene.sound.add(AUDIO.pause.key);

        scene.input?.keyboard?.on('keydown-ENTER', () => {


            const parentScene = scene.scene.get(scene.parentScene) as GlobalScene;

            if(parentScene.physics.world.isPaused){
                parentScene.physics.world.resume();
                parentScene.anims.resumeAll();
                parentScene.sound.resumeAll();
                parentScene.scene.resume();
            }else{
                parentScene.sound.pauseAll();
                parentScene.physics.world.pause();
                parentScene.anims.pauseAll();
                parentScene.scene.pause();
            }

            this.pauseSong.play({volume: 0.1});

            parentScene.events.emit(CustomEvents.START, parentScene.physics.world.isPaused);
        });
    }
}