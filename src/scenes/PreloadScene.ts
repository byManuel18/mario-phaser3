import { ANIMATIONS } from "../entities/config/animations";
import { SPRITES } from "../entities/config/sprites";
import { Mario } from "../entities/mario";
import { SCREENHEIGHT, SCREENWIDTH } from "../main";
import { AUDIO } from "./audio/audio";
import { SCENES } from "./config/scenes.config";


export class PreloadScene extends Phaser.Scene {

    player?: Mario;

    constructor(){
        super(SCENES.PRELOAD);
    }

    preload():void{
        this.loadSprites();
        this.loadAudio();
    }

    create():void{
        this.createAnimations();

        this.physics.world.setBounds(0, 0, SCREENWIDTH, SCREENHEIGHT);
        
      
        this.scene.start(SCENES.LEVEL_ONE);
      
    }


    private loadSprites(){

        const {key, path, frames: {frameHeight, frameWidth}} = SPRITES.mario;

        this.load.spritesheet(
            key,
            path,
            { frameWidth, frameHeight },
        )
    }

    private createAnimations(){
        this.anims.create({
            key: ANIMATIONS.mario.walk.key,
            frames: this.anims.generateFrameNumbers(
                ANIMATIONS.mario.walk.sprite.key,
                { 
                    start: ANIMATIONS.mario.walk.sprite.start, 
                    end:  ANIMATIONS.mario.walk.sprite.end 
                }
            ),
            frameRate: ANIMATIONS.mario.walk.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: ANIMATIONS.mario.idle.key,
            frames: this.anims.generateFrameNumbers(
                ANIMATIONS.mario.idle.sprite.key,
                { 
                    start: ANIMATIONS.mario.idle.sprite.start, 
                    end:  ANIMATIONS.mario.idle.sprite.end 
                }
            ),
            frameRate: ANIMATIONS.mario.idle.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: ANIMATIONS.mario.jump.key,
            frames: this.anims.generateFrameNumbers(
                ANIMATIONS.mario.jump.sprite.key,
                { 
                    start: ANIMATIONS.mario.jump.sprite.start, 
                    end:  ANIMATIONS.mario.jump.sprite.end 
                }
            ),
            frameRate: ANIMATIONS.mario.jump.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: ANIMATIONS.mario.dead.key,
            frames: this.anims.generateFrameNumbers(
                ANIMATIONS.mario.dead.sprite.key,
                { 
                    start: ANIMATIONS.mario.dead.sprite.start, 
                    end:  ANIMATIONS.mario.dead.sprite.end 
                }
            ),
            frameRate: ANIMATIONS.mario.dead.frameRate,
            repeat: -1
        });

        
    }

    private loadAudio(){
        this.load.audio(AUDIO.overworldTheme.key,AUDIO.overworldTheme.path);
        this.load.audio(AUDIO.dead.key,AUDIO.dead.path);
    }

 
}