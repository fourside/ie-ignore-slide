import {render, html} from 'lit-html';
import keycode from 'keycode';

import {markdown} from './markdown';

const ACTIVE_FROM_RIGHT_CLASS = 'active-from-right';
const ACTIVE_FROM_LEFT_CLASS = 'active-from-left';
const LEFTOUT_CLASS = 'left-out';
const RIGHTOUT_CLASS = 'right-out';
const MD_DELIMITER = '---';

export default class Slider extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.innerHTML = this.parseMarkdow(this.textContent);
    render(this.template, this.shadowRoot);
    this.addListner(document);
    this.pager();
    this.activate(null, location.href);
    window.onhashchange = (event) => {
      this.activate(event.oldURL, event.newURL);
    };
  }

  get template() {
    return html`
      <style>
      * {
        color: #3a3a3a;
      }
      </style>
      <slot></slot>
    `;
  }

  parseMarkdow(src) {
    return src.split(MD_DELIMITER).map((s) => {
      return '<x-slide>' + markdown(s) + '</x-slide>';
    }).join('');
  }

  pager() {
    Array.prototype.forEach.call(this.children, (child, i) => {
      child.setAttribute('data-page', i + 1);
    });
  }

  max() {
    return this.children.length -1;
  }

  addListner(element) {
    element.onkeyup = event => {
      if (['right', 'j'].some(key => keycode.isEventKey(event, key))) {
        this.next();
      }
      if (['left', 'k'].some(key => keycode.isEventKey(event, key))) {
        this.prev();
      }
    };
  }

  activate(oldURL, newURL) {
    let index = 0;
    const hash = new URL(newURL).hash;
    if (hash !== '') {
      index = parseInt(hash.substr(1), 10);
    }
    const oldHash = oldURL ? new URL(oldURL).hash : '#0';
    const oldIndex = parseInt(oldHash.substr(1), 10);
    Array.prototype.forEach.call(this.children, (child, i) => {
      if (i === index) {
        if (index > oldIndex) {
          child.classList.add(ACTIVE_FROM_RIGHT_CLASS);
          child.classList.remove(ACTIVE_FROM_LEFT_CLASS);
        } else {
          child.classList.remove(ACTIVE_FROM_RIGHT_CLASS);
          child.classList.add(ACTIVE_FROM_LEFT_CLASS);
        }
        child.classList.remove(RIGHTOUT_CLASS);
        child.classList.remove(LEFTOUT_CLASS);
      } else if (i > index) {
        child.classList.remove(ACTIVE_FROM_LEFT_CLASS);
        child.classList.remove(ACTIVE_FROM_RIGHT_CLASS);
        child.classList.add(RIGHTOUT_CLASS);
        child.classList.remove(LEFTOUT_CLASS);
      } else {
        child.classList.remove(ACTIVE_FROM_LEFT_CLASS);
        child.classList.remove(ACTIVE_FROM_RIGHT_CLASS);
        child.classList.remove(RIGHTOUT_CLASS);
        child.classList.add(LEFTOUT_CLASS);
      }
    });
  }

  current() {
    const index = Array.prototype.findIndex.call(this.children, (child) => {
      return child.classList.contains(ACTIVE_FROM_LEFT_CLASS) || child.classList.contains(ACTIVE_FROM_RIGHT_CLASS);
    });
    return index > -1 ? index : 0;
  }

  next() {
    const i = this.current();
    if (i < this.max()) {
      this.changeHash(i + 1);
    }
  }

  prev() {
    const i = this.current();
    if (i > 0) {
      this.changeHash(i - 1);
    }
  }

  changeHash(index) {
    window.location.hash = '#' + index;
  }

}

