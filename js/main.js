window.onkeydown = listenKeyDown;
window.onkeyup = listenKeyUp;

// FIXME:
// La sequenza:
//              Alt down > Maiusc down > Alt up > Maiusc up
// lascia Alt colorato. Succede non solo per Alt, ma anche per
// Home/End e le 4 frecce. Non succede per Ctrl.

async function listenKeyDown(e) {
  press(await getKeyByEvent(e));
  console.log(cursor.getAttribute('pos'))
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let offset = 'ArrowLeft' == e.key ? -1 : 1;
    let newpos = Number(cursor.getAttribute('pos')) + offset;
    let text = document.getElementById('text');
    text.insertBefore(cursor, text.children[newpos]);
    cursor.setAttribute('pos', newpos);
  }
  console.log(cursor.getAttribute('pos'))
}

async function listenKeyUp(e) {
  release(await getKeyByEvent(e));
}

async function getKeyByEvent(e) {
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
