import {render, html} from 'lit-html';
import keycode from 'keycode';

import {markdown} from './markdown';

const ACTIVE_CLASS = 'active';
const markdownDelimiter = '---';

export default class Slider extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.innerHTML = this.md(this.textContent);
    render(this.template, this.shadowRoot);
    this.addListner(document);

    Array.prototype.forEach.call(this.children, (child, i) => {
      child.setAttribute('data-page', i + 1);
    });
    this.activate(0);
  }

  get template() {
    return html`
      <slot></slot>
    `;
  }

  md(src) {
    return src.split(markdownDelimiter).map((s) => {
      return '<x-slide>' + markdown(s) + '</x-slide>';
    }).join('');
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
    }
  }

  activate(index) {
    Array.prototype.forEach.call(this.children, (child, i) => {
      if (i === index) {
        child.classList.add(ACTIVE_CLASS);
      } else {
        child.classList.remove(ACTIVE_CLASS);
      }
    });
  }

  current() {
    const index = Array.prototype.findIndex.call(this.children, (child) => {
      return child.classList.contains(ACTIVE_CLASS);
    });
    return index > -1 ? index : 0;
  }

  next() {
    const i = this.current();
    if (i < this.max()) {
      this.activate(i + 1);
    }
  }

  prev() {
    const i = this.current();
    if (i > 0) {
      this.activate(i - 1);
    }
  }

}

