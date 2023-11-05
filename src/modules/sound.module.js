import { Module } from '../core/module'
import { importAll, randomNumber } from '../utils'


const soundsArray = importAll(require.context('../assets', false, /\.(mp3|ogg|wav)$/));

export class SoundModule extends Module {
    constructor() {
        super('random-sound', 'Случайный звук');
    }
    trigger() {
        const audio = new Audio(soundsArray[randomNumber(0, soundsArray.length - 1)]);
        audio.play();
    }
}