let selection = (function(){
  "use strict";
  let impl = {
    active: false,
    dir: 1,
    beg: undefined,
    begin_pos: undefined,
    tokens: document.getElementById('tokenized-text')
  };
  return {
    forward: () => impl.dir == 1,
    backward: () => impl.dir == -1,
    begin_pos: () => impl.begin_pos,
    active: () => impl.active,
    start: () => {
      impl.active = true;
      cursor.classList.add('selection-end');
      let curpos = Number(cursor.getAttribute('pos'));
      impl.begin_pos = curpos + 1;
      impl.beg = impl.tokens.children[impl.begin_pos];
      impl.beg.classList.add('selection-beg');
    },
    clear: () => {
      impl.active = false;
      cursor.classList.remove('selection-beg'); // TODO: remove both or check
      cursor.classList.remove('selection-end'); // TODO: and remove only one?
      impl.beg.classList.remove('selection-beg');
      impl.beg.classList.remove('selection-end');
      impl.dir = 1;
      let curpos = Number(cursor.getAttribute('pos'));
      impl.begin_pos = undefined;
      impl.beg = impl.tokens.children[curpos + 1];
    },
    invert: () => {
      let end = document.getElementsByClassName('selection-end')[0];
      let beg = document.getElementsByClassName('selection-beg')[0];
      end.classList.remove('selection-end');
      beg.classList.remove('selection-beg');
      end.classList.add('selection-beg');
      beg.classList.add('selection-end');
      impl.dir *= -1;
    }
  };
})();
