import {render, html} from 'lit-html';

const DEFALT_SEC = 60 * 5;

export default class TimeProgress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    render(this.template, this.shadowRoot);
    this.start();
  }

  start() {
    const query = window.location.search;
    let durationSec = parseInt(query.substring(1).split('=')[1], 10);
    if (!durationSec) {
      durationSec = DEFALT_SEC;
    }

    const progressBar = this.shadowRoot.getElementById('progress');
    const startSec = Date.now() / 1000;

    const intervalId = window.setInterval(() => {
      if (progressBar.value >= 100) {
        window.clearInterval(intervalId);
        return;
      }
      const elapsedSec = (Date.now() / 1000) - startSec;
      const progress = (elapsedSec / durationSec) * 100;
      progressBar.value = progress;
    }, 100);
  }

  get template() {
    return html`
      <style>
      progress {
        width: 100%;
        border-radius: 5px;
        background: transparent;
        appearance: none;
        height:10px;
      }
      progress::-moz-progress-bar {
        border-radius: 5px;
        background-color: hsl(204, 86%, 53%);
      }
      progress::-webkit-progress-bar {
        background: transparent;
      }
      progress::-webkit-progress-value {
        border-radius: 5px;
        background-color: hsl(204, 86%, 53%);
      }
      </style>
      <progress id="progress" value="0" max="100"></progress>
    `;
  }
}
