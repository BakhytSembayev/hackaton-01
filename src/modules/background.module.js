import { Module } from '../core/module'
import { getRandomColor } from '../utils';

export class BackgroundModule extends Module {
    constructor() {
        super('random-bg', 'Случайный цвет');
    }

    trigger() {
        document.body.style.backgroundColor = getRandomColor();
        document.body.style.backgroundImage = 'none';
    }
}