window.onkeydown = listenKeyDown;
window.onkeyup = listenKeyUp;

// FIXME:
// La sequenza:
//              Alt down > Maiusc down > Alt up > Maiusc up
// lascia Alt colorato. Succede non solo per Alt, ma anche per
// Home/End e le 4 frecce. Non succede per Ctrl.
//
function listenKeyDown(e) {
  console.log(e)
  if (e.altKey) {
    document.getElementById('Alt').style.background = '#00ff00';
  }
  if (e.ctrlKey) {
    document.getElementById('CtrlLeft').style.background = '#00ff00';
  }
  if (e.shiftKey) {
    document.getElementById('ShiftLeft').style.background = '#00ff00';
  }
  let key = e.key != ' ' ? e.key : 'Space';
  let elem = document.getElementById(key);
  if (elem && !e.altKey && !e.ctrlKey && !e.shiftKey) {
    elem.style.background = '#00ff00';
  }
}

function listenKeyUp(e) {
  console.log(e)
  if (e.altKey) {
    document.getElementById('Alt').style.background = 'none';
  }
  if (e.ctrlKey) {
    document.getElementById('CtrlLeft').style.background = 'none';
  }
  if (e.shiftKey) {
    document.getElementById('ShiftLeft').style.background = 'none';
  }
  let key = e.key != ' ' ? e.key : 'Space';
  let elem = document.getElementById(key);
  if (elem && !e.altKey && !e.ctrlKey && !e.shiftKey) {
    document.getElementById(key).style.background = 'none';
  }
}
