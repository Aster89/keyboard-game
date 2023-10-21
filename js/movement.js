let movement_keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

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

let higher_lefter = (elem, cur) => elem.offsetTop < cur.offsetTop && elem.offsetLeft < cur.offsetLeft;
let lower_rigther = (elem, cur) => elem.offsetTop > cur.offsetTop && elem.offsetLeft > cur.offsetLeft;
let isspan = elem => elem.tagName == 'SPAN';

function movecursor(e) {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let dir = e.key == 'ArrowLeft' ? -1 : 1;
    advance(e.ctrlKey ? stride(dir) : 1, dir);
  } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    let cur = par.children['cursor'];
    let curpos = Number(cur.getAttribute('pos'));
    let offset = 0;
    if ('ArrowUp' == e.key) {
      offset = Array.from(par.children)
        .slice(0, curpos)
        .reverse()
        .findIndex(elem => isspan(elem) && higher_lefter(elem, cur));
    } else {
      offset = Array.from(par.children)
        .slice(curpos)
        .findIndex(elem => isspan(elem) && lower_rigther(elem, cur));
    }
    let dir = e.key == 'ArrowUp' ? -1 : 1;
    let candidates = [par.children[curpos + dir * offset - 1],
                      par.children[curpos + dir * offset]];
    let displs = candidates
      .map(e => e.offsetLeft)
      .map(minus(cur.offsetLeft))
      .map(Math.abs);
    let winner = displs.indexOf(Math.min(...displs));
    advance(offset + dir * (winner - (dir + 1)/2 - 1), dir);
  }
}
