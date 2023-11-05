import { Menu } from './core/menu';
import { Module } from './core/module';

const parser = new DOMParser();
export class ContextMenu extends Menu {
  constructor() {
    super('#menu');
  }

  open(event) {
    event.preventDefault();
    this.el.classList.add('open');
    this.el.style.left = event.clientX + 'px';
    this.el.style.top = event.clientY + 'px';

  }

  close() {
    this.el.classList.remove('open');
  }

  add(modules) {
    this.el.append(...modules
      .map(module => {
        const htmlElement = parser.parseFromString(module['module'].toHTML(), 'text/html').body.firstElementChild;
        htmlElement.addEventListener('click', event => {
          event.stopPropagation();
          module['callback'].call(module['module']);
        });
        return htmlElement;
      })
      .reduce((acc, val) => {
        return [...acc, val]
      }, []));
  }
}