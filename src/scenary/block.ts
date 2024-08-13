import { GAME_SCALE } from "../config";

export abstract class Block extends Phaser.Physics.Arcade.Sprite{

    public  SPRITE_HEIGHT: number = 0;
    public  SPRITE_WIDTH: number = 0;

    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.setOrigin(0,1);
        this.setScale(GAME_SCALE, GAME_SCALE);
        this.refreshBody();
        this.SPRITE_HEIGHT = this.frame.cutHeight;
        this.SPRITE_WIDTH = this.frame.cutWidth;
        
    }
}