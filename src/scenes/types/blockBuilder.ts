import { Block } from "../../scenary/block";

export type BlockBuilder = new (scene: Phaser.Scene, x: number, y: number) => Block;
