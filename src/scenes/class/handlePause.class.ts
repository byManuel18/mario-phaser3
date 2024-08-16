import { AUDIO } from "../audio/audio";
import { CustomEvents } from "../config/customEvents";
import { GlobalScene } from "./globalScene.class";


export class HandlePause {


    constructor(scene: GlobalScene){
        scene.input?.keyboard?.on('keydown-ENTER', () => {

            scene.sound.add(AUDIO.pause.key).play({volume: 0.5});

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