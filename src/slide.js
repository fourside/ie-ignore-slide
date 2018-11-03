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
      <p>${text}</p>
    `;
  }
}

customElements.define('x-slide', Slide);
