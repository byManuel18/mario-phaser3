import { AUDIO } from "../audio/audio";
import { CustomEvents } from "../config/customEvents";
import { GlobalScene } from "./globalScene.class";


export class HandlePause {

    pauseSong: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;


    constructor(scene: GlobalScene){
        this.pauseSong = scene.sound.add(AUDIO.pause.key);

        scene.input?.keyboard?.on('keydown-ENTER', () => {

            this.pauseSong.play({volume: 0.1});

            if(scene.physics.world.isPaused){
                scene.physics.world.resume();
                scene.anims.resumeAll();
                scene.mainAudio?.resume()
            }else{
                scene.mainAudio?.pause()
                scene.physics.world.pause();
                scene.anims.pauseAll();
            }

            scene.events.emit(CustomEvents.START,scene.physics.world.isPaused);
        });
    }
}