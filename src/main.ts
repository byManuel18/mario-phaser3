import {Types, Game} from 'phaser';
import { getConfig } from './config';

import './style.css';

export const SCREENWIDTH = window.innerWidth;
export const SCREENHEIGHT = window.innerHeight;


const config: Types.Core.GameConfig = getConfig(SCREENHEIGHT, SCREENWIDTH);


const game = new Game(config);
