
function advance(steps, dir) {
  let offset = steps * dir;
  let tokens = document.getElementById('tokenized-text');
  let curpos = Number(cursor.getAttribute('pos'));
  tokens.insertBefore(cursor, tokens.children[curpos + offset + (dir + 1)/2]);
  cursor.setAttribute('pos', curpos + offset);
}

function eow(dir) {
  return 3;
}

function movecursor(e) {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let steps = 1;
    let dir = e.key == 'ArrowLeft' ? -1 : 1;
    if (e.ctrlKey) {
      steps = eow(dir);
    }
    advance(steps, dir);
  }
}
