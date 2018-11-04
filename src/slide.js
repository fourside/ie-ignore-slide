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
        padding: 0 5%;
        margin: 0;
        height: calc(100% - 50px);
        position: relative;
      }

      ::slotted(h1) {
        font-size: 400%;
        position: relative;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      ::slotted(h2) {
        font-size: 300%;
      }
      ::slotted(pre) {
        background-color: #e6e8ea;
        border-radius: 10px;
        padding: 16px;
      }
      ::slotted(.meta) {
        color: #1a0a0a;
        opacity: 0.8;
        margin: 0;
      }
      ::slotted(.author) {
        position: absolute;
        bottom: 1.5em;
      }
      ::slotted(.pubdate) {
        position: absolute;
        bottom: 0;
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

