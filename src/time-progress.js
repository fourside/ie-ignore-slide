import {render, html} from 'lit-html';

export default class TimeProgress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    render(this.template, this.shadowRoot);
    this.progress = this.shadowRoot.getElementById('progress');
    this.start();
  }

  start() {
    const query = window.location.search;
    const durationSec = parseInt(query.substring(1).split('=')[1], 10);
    if (!durationSec) {
      return;
    }
    const startSec = Date.now() / 1000;

    const intervalId = window.setInterval(() => {
      if (this.progress.value >= 100) {
        window.clearInterval(intervalId);
        return;
      }
      const elapsed = (Date.now() / 1000) - startSec;
      const progress = (elapsed / durationSec) * 100;
      this.progress.value = progress;
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
