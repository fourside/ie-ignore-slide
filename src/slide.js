import {render, html} from 'lit-html';

export default class Slide extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    render(this.template, this.shadowRoot);
  }

  get template() {
    const text = this.innerHTML.trim();
    return html`
      <style>
      div {
        margin: 0;
        padding: 5%;
      }
      </style>
      <div>
        ${text}
      </div>
    `;
  }
}

customElements.define('x-slide', Slide);
