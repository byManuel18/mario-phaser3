import { SPRITES } from "../entities/config/sprites";
import { Block } from "./block";


export class Brik extends Block{

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene,x,y,SPRITES.briks.key);
    }

}