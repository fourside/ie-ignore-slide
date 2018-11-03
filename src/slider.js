import {render, html} from 'lit-html';
import keycode from 'keycode';

export default class Slider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    addListner(document);
    render(this.template, this.shadowRoot);
  }

  get template() {
    return html`
      <slot></slot>
    `;
  }
}

function addListner(element) {
  element.onkeyup = event => {
    if (['right', 'j'].some(key => keycode.isEventKey(event, key))) {
      console.log('next');
    }
    if (['left', 'k'].some(key => keycode.isEventKey(event, key))) {
      console.log('prev');
    }
  }
}

customElements.define('x-slider', Slider);

