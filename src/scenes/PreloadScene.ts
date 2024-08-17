import { ANIMATIONS } from "../entities/config/animations";
import { SPRITES } from "../entities/config/sprites";
import { AUDIO } from "./audio/audio";
import { SCENES } from "./config/scenes.config";


export class PreloadScene extends Phaser.Scene {


    constructor(){
        super(SCENES.PRELOAD);
    }

    preload():void{
        this.loadSprites();
        this.loadAudio();
        this.loadImages();
    }

    create():void{
        this.createAnimations();
      
        this.scene.start(SCENES.LEVEL_ONE);
      
    }


    private loadSprites(){

        const {key, path, frames: {frameHeight, frameWidth}} = SPRITES.mario;
        
        this.load.spritesheet(
            key,
            path,
            { frameWidth, frameHeight },
        );

        const goobasprite = SPRITES.goomba;
        
        this.load.spritesheet(
            goobasprite.key,
            goobasprite.path,
            { frameWidth: goobasprite.frames.frameWidth, frameHeight: goobasprite.frames.frameHeight },
        );
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

        this.anims.create({
            key: ANIMATIONS.goomba.walk.key,
            frames: this.anims.generateFrameNumbers(
                ANIMATIONS.goomba.walk.sprite.key,
                { 
                    start: ANIMATIONS.goomba.walk.sprite.start, 
                    end:  ANIMATIONS.goomba.walk.sprite.end 
                }
            ),
            frameRate: ANIMATIONS.goomba.walk.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: ANIMATIONS.goomba.dead.key,
            frames: this.anims.generateFrameNumbers(
                ANIMATIONS.goomba.dead.sprite.key,
                { 
                    start: ANIMATIONS.goomba.dead.sprite.start, 
                    end:  ANIMATIONS.goomba.dead.sprite.end 
                }
            ),
            frameRate: ANIMATIONS.goomba.dead.frameRate,
            repeat: -1
        });

        
    }

    private loadAudio(){
        this.load.audio(AUDIO.overworldTheme.key,AUDIO.overworldTheme.path);
        this.load.audio(AUDIO.dead.key,AUDIO.dead.path);
        this.load.audio(AUDIO.pause.key,AUDIO.pause.path);
        this.load.audio(AUDIO.marioJump.key,AUDIO.marioJump.path);
        this.load.audio(AUDIO.goombaStomp.key,AUDIO.goombaStomp.path);
    }

    private loadImages(){
        this.load.image("mushroom", "../../assets/collectibles/super-mushroom.png");
        this.load.image("mushroom-live", "../../assets/collectibles/live-mushroom.png");
        this.load.image("slot", "../../assets/mine/slot.png");
    }

 
}