import Slide from './slide.js';

import keycode from 'keycode';

document.onkeyup = event => {
  if (['right', 'j'].some(key => keycode.isEventKey(event, key))) {
    console.log('next');
  }
  if (['left', 'k'].some(key => keycode.isEventKey(event, key))) {
    console.log('prev');
  }
}

