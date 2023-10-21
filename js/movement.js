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

let selection_mode = false;

function invert_selection_dir(argument) {
  let end = document.getElementsByClassName('selection-end')[0];
  end.classList.remove('selection-end');
  let beg = document.getElementsByClassName('selection-beg')[0];
  beg.classList.remove('selection-beg');
  end.classList.add('selection-beg');
  beg.classList.add('selection-end');
}

function movecursor(e) {
  if (e.shiftKey && !selection_mode) {
    selection_mode = true;
    start_selection();
  }
  if (!e.shiftKey && selection_mode) {
    selection_mode = false;
    remove_selection();
  }
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
  if (selection_start_pos != undefined) {
    let curpos = Number(par.children['cursor'].getAttribute('pos'));
    if (selection_dir == 1 && selection_start_pos > curpos) {
      selection_dir = -1;
      invert_selection_dir();
    } else if (selection_dir == -1 && selection_start_pos <= curpos) {
      selection_dir = 1;
      invert_selection_dir();
    }
  }
}

let selection_start_pos = undefined;
let selection_start = undefined;
let selection_dir = 1;

let start_selection = () => {
  cursor.classList.add('selection-end');
  let tokens = document.getElementById('tokenized-text');
  let curpos = Number(cursor.getAttribute('pos'));
  selection_start_pos = curpos + 1;
  selection_start = tokens.children[selection_start_pos];
  selection_start.classList.add('selection-beg');
};

let remove_selection = () => {
  cursor.classList.remove('selection-beg'); // TODO: remove both or check
  cursor.classList.remove('selection-end'); // TODO: and remove only one?
  selection_start.classList.remove('selection-beg');
  selection_start.classList.remove('selection-end');
  selection_dir = 1;
  let tokens = document.getElementById('tokenized-text');
  let curpos = Number(cursor.getAttribute('pos'));
  selection_start_pos = undefined;
  selection_start = tokens.children[curpos + 1];
};
