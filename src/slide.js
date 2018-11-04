import {render, html} from 'lit-html';

export default class Slide extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    render(this.template, this.shadowRoot);
  }

  get template() {
    return html`
      <style>
      .slide {
        padding: 5%;
        height: 80%;
        position: relative;
      }
      .page {
        margin: 0;
        color: grey;
        position: absolute;
        bottom: 0;
        right: 10px;
        font-size: 1.5em;
        font-family: serif;
      }
      </style>
      <div class="slide">
        <slot></slot>
        <h5 class="page">${this.getAttribute('data-page')} / ${this.total}</h5>
      </div>
    `;
  }

  get total() {
    return this.parentNode.children.length;
  }


}

