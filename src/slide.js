
export default class Slide extends HTMLElement {
  constructor() {
    super();
    const p = document.createElement('p');
    p.innerText = this.innerText.trim(); 
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(p);
  }
}

customElements.define('x-slide', Slide);
