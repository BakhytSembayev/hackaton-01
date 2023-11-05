// import {getEvent} from './utils'
import { Menu } from './core/menu';
import { Module } from './core/module';

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);
    this.bindContextMenu();
  }

  bindContextMenu() {
    const targetElement = document.querySelector(this.selector);
    targetElement.addEventListener('contextmenu', event => {
      event.preventDefault();
      this.el.style.top = `${event.clientY}px`;
      this.el.style.left = `${event.clientX}px`;
      this.el.classList.add('open');
    });
  }

  open() {
    document.body.removeEventListener('contextmenu', this.boundOpenHandler);
    this.boundOpenHandler = event => {
      event.preventDefault();
      this.el.style.top = `${event.clientY}px`;
      this.el.style.left = `${event.clientX}px`;
      this.el.classList.add('open');
    };
    document.body.addEventListener('contextmenu', this.boundOpenHandler);
  }

  close() {
    document.body.addEventListener('click', event => {
      event.preventDefault();
      if (event.target.classList[0] === 'menu-item') {
        this.el.classList.remove('open');
      }
      this.el.classList.remove('open');
    });
  }

  add(array) {
    for (let item in array) {
      const newModule = new Module(array[item].type, array[item].text);
      this.el.insertAdjacentHTML('beforeend', newModule.toHTML());
    }
  }
}


console.log('hallo');