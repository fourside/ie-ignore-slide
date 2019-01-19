import {render, html} from 'lit-html';

export default class TimeProgress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    render(this.template, this.shadowRoot);
    this.progress = this.shadowRoot.getElementById('progress');

    const intervalId = window.setInterval(() => {
      if (this.progress.value < 100) {
        this.progress.value += 0.1;
        return;
      }
      window.clearInterval(intervalId);
    }, 100);
  }

  get template() {
    return html`
      <style>
      progress {
        width: 100%;
        border-radius: 5px;
        background: transparent;
      }
      progress::-moz-progress-bar {
        border-radius: 5px;
      }
      progress::-webkit-progress-bar {
        background: transparent;
      }
      progress::-webkit-progress-value {
        border-radius: 5px;
      }
      </style>
      <progress id="progress" value="0" max="100"></progress>
    `;
  }
}
