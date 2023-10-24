window.onkeydown = listenKeyDown;
window.onkeyup = listenKeyUp;

// FIXME:
// La sequenza:
//              Alt down > Maiusc down > Alt up > Maiusc up
// lascia Alt colorato. Succede non solo per Alt, ma anche per
// Home/End e le 4 frecce. Non succede per Ctrl.

async function listenKeyDown(e) {
  "use strict";
  press(await getKeyByEvent(e));
  if (movement_keys.includes(e.key)) {
    movecursor(e);
  }
}

async function listenKeyUp(e) {
  "use strict";
  release(await getKeyByEvent(e));
}

async function getKeyByEvent(e) {
  "use strict";
  let key = await getKey(e);
  if (key == 'AltGraph') {
    key = 'AltRight';
  }
  if (key == ' ') {
    key = 'Space';
  }
  if (key >= '0' && key <= '9' || e.code.startsWith('Numpad')
                               || e.key == 'Shift'
                               || e.key == 'Control'
                               || e.key == 'Alt') {
    key = e.code;
  }
  return document.getElementById(key);
}

async function getKey(e) {
  "use strict";
  let maybe_key = await navigator.keyboard.getLayoutMap().then(klm => klm.get(e.code));
  return maybe_key ? maybe_key : e.key;
}


let keyboard = document.getElementsByTagName('body')[0].children[0];
