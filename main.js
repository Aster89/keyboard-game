window.onkeydown = listenKeyDown;
window.onkeyup = listenKeyUp;

function listenKeyDown(e) {
  console.log('down')
  console.log(e)
  if (e.altKey) {
    document.getElementById('alt').style.background = '#00ff00';
  }
  if (e.ctrlKey) {
    document.getElementById('ctrl').style.background = '#00ff00';
  }
  if (e.shiftKey) {
    document.getElementById('shift').style.background = '#00ff00';
  }
  if (e.key == document.getElementById('End')) {
    document.getElementById('End').style.background = '#00ff00';
  }
  if (e.key == 'ArrowLeft') {
    document.getElementById('ArrowLeft').style.background = '#00ff00';
  }
  if (e.key == 'ArrowRight') {
    document.getElementById('ArrowRight').style.background = '#00ff00';
  }
  if (e.key == 'ArrowUp') {
    document.getElementById('ArrowUp').style.background = '#00ff00';
  }
  if (e.key == 'ArrowDown') {
    document.getElementById('ArrowDown').style.background = '#00ff00';
  }
}

function listenKeyUp(e) {
  console.log('up')
  console.log(e)
  if (e.altKey) {
    document.getElementById('alt').style.background = 'none';
  }
  if (e.ctrlKey) {
    document.getElementById('ctrl').style.background = 'none';
  }
  if (e.shiftKey) {
    document.getElementById('shift').style.background = 'none';
  }
  if (e.key == 'End') {
    document.getElementById('End').style.background = 'none';
  }
  if (e.key == 'ArrowLeft') {
    document.getElementById('ArrowLeft').style.background = 'none';
  }
  if (e.key == 'ArrowRight') {
    document.getElementById('ArrowRight').style.background = 'none';
  }
  if (e.key == 'ArrowUp') {
    document.getElementById('ArrowUp').style.background = 'none';
  }
  if (e.key == 'ArrowDown') {
    document.getElementById('ArrowDown').style.background = 'none';
  }
}
