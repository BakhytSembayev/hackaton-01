import {Module} from '../core/module'
import { randomNumber } from '../utils';

export class BackgroundModule extends Module {
    constructor(type, text) {
        super(type, text);
    }
    
    trigger(element) {
        const r = randomNumber(0, 255),
              g = randomNumber(0, 255),
              b = randomNumber(0, 255),
              a = Math.round(randomNumber(1, 100)) / 100;
        element.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
        element.style.backgroundImage = 'none';
    }
}