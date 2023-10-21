let selection = {
  dir: 1,
  beg: undefined,
  begin_pos: undefined,
  active: false,
  start: () => {
    selection.active = true;
    cursor.classList.add('selection-end');
    let tokens = document.getElementById('tokenized-text');
    let curpos = Number(cursor.getAttribute('pos'));
    selection.begin_pos = curpos + 1;
    selection.beg = tokens.children[selection.begin_pos];
    selection.beg.classList.add('selection-beg');
  },
  clear: () => {
    selection.active = false;
    cursor.classList.remove('selection-beg'); // TODO: remove both or check
    cursor.classList.remove('selection-end'); // TODO: and remove only one?
    selection.beg.classList.remove('selection-beg');
    selection.beg.classList.remove('selection-end');
    selection.dir = 1;
    let tokens = document.getElementById('tokenized-text');
    let curpos = Number(cursor.getAttribute('pos'));
    selection.begin_pos = undefined;
    selection.beg = tokens.children[curpos + 1];
  },
  invert: () => {
    let end = document.getElementsByClassName('selection-end')[0];
    end.classList.remove('selection-end');
    let beg = document.getElementsByClassName('selection-beg')[0];
    beg.classList.remove('selection-beg');
    end.classList.add('selection-beg');
    beg.classList.add('selection-end');
    selection.dir *= -1;
  }
};
