window.onload =  hit_key;
window.onkeydown = listenKeyDown;
window.onkeyup = listenKeyUp;

// FIXME:
// La sequenza:
//              Alt down > Maiusc down > Alt up > Maiusc up
// lascia Alt colorato. Succede non solo per Alt, ma anche per
// Home/End e le 4 frecce. Non succede per Ctrl.

function hit_key() {
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
  window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'Escape'}));
}

async function listenKeyDown(e) {
  console.log(e)
  document.getElementById('CapsLock').style.background =
    e.getModifierState('CapsLock') ? '#00ff00' : 'none';
  let elem = await getElementByEvent(e);
  elem.style.background = '#00ff00';
}

async function listenKeyUp(e) {
  console.log(e)
  let elem = await getElementByEvent(e);
  elem.style.background = 'none';
}

async function getElementByEvent(e) {
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
  let maybe_key = await navigator.keyboard.getLayoutMap().then(klm => klm.get(e.code));
  return maybe_key ? maybe_key : e.key;
}
