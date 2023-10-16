
function advance(steps, dir) {
  let offset = steps * dir;
  let tokens = document.getElementById('tokenized-text');
  let curpos = Number(cursor.getAttribute('pos'));
  tokens.insertBefore(cursor, tokens.children[curpos + offset + (dir + 1)/2]);
  cursor.setAttribute('pos', curpos + offset);
}

function eow(dir) {
  let curpos = Number(cursor.getAttribute('pos'));
  return dir == 1
    ? RegExp(/^ *([a-zA-Z0-9]+|.|\n)/).exec(text.substr(curpos))[0].length
    : RegExp(/([a-zA-Z0-9]+|.|\n) *$/).exec(text.substr(0, curpos))[0].length;
}

function movecursor(e) {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let dir = e.key == 'ArrowLeft' ? -1 : 1;
    advance(e.ctrlKey ? eow(dir) : 1, dir);
  }
}
