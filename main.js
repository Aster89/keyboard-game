window.onkeydown = listenKeyDown;
window.onkeyup = listenKeyUp;

// FIXME:
// La sequenza:
//              Alt down > Maiusc down > Alt up > Maiusc up
// lascia Alt colorato. Succede non solo per Alt, ma anche per
// Home/End e le 4 frecce. Non succede per Ctrl.
//
function listenKeyDown(e) {
  //console.log(e)
  if (e.altKey) {
    document.getElementById('alt').style.background = '#00ff00';
  }
  if (e.ctrlKey) {
    document.getElementById('ctrl').style.background = '#00ff00';
  }
  if (e.shiftKey) {
    document.getElementById('shift').style.background = '#00ff00';
  }
  let elem = document.getElementById(e.key);
  if (elem && !e.altKey && !e.ctrlKey && !e.shiftKey) {
    elem.style.background = '#00ff00';
  }
}

function listenKeyUp(e) {
  //console.log(e)
  if (e.altKey) {
    document.getElementById('alt').style.background = 'none';
  }
  if (e.ctrlKey) {
    document.getElementById('ctrl').style.background = 'none';
  }
  if (e.shiftKey) {
    document.getElementById('shift').style.background = 'none';
  }
  let elem = document.getElementById(e.key);
  if (elem && !e.altKey && !e.ctrlKey && !e.shiftKey) {
    document.getElementById(e.key).style.background = 'none';
  }
}
