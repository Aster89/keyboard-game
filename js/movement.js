
function advance(steps, dir) {
  let offset = steps * dir;
  let tokens = document.getElementById('tokenized-text');
  let curpos = Number(cursor.getAttribute('pos'));
  tokens.insertBefore(cursor, tokens.children[curpos + offset + (dir + 1)/2]);
  cursor.setAttribute('pos', curpos + offset);
}

function stride(dir) {
  let curpos = Number(cursor.getAttribute('pos'));
  return dir == 1
    ? RegExp(/^ *([a-zA-Z0-9]+|.|\n)/).exec(text.substr(curpos))[0].length
    : RegExp(/([a-zA-Z0-9]+|.|\n) *$/).exec(text.substr(0, curpos))[0].length;
}

function movecursor(e) {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let dir = e.key == 'ArrowLeft' ? -1 : 1;
    advance(e.ctrlKey ? stride(dir) : 1, dir);
  } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    let cur = par.children['cursor'];
    let curpos = cur.getAttribute('pos');
    if ('ArrowUp') {
      let offset = Array.from(par.children)
        .slice(0, curpos)
        .reverse()
        .findIndex(elem => elem.tagName == 'SPAN' && elem.offsetLeft < cur.offsetLeft && elem.offsetTop < cur.offsetTop);
      let displs = [-1, 0].map(i => Math.abs(par.children[cur.getAttribute('pos') - offset + i].offsetLeft - cur.offsetLeft));
      advance(offset + [1, 0][displs.indexOf(Math.min(...displs))], -1);
    } else {
    }
  }
}
