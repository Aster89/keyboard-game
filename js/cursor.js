let cursor = (function(){
  "use strict";

  let span = document.createElement('span');
  span.id = 'cursor';
  span.classList.add('blinking');

  let position = Math.floor(Math.random() * text.length());

  span.setAttribute('pos', position);

  text.insertAt(span, position);

  let adjust = (offset, dir) => + offset + (dir + 1)/2;

  return {
    pos: () => position,
    advance: (steps, dir) => {
      let offset = steps * dir;
      text.insertAt(span, cursor.pos() + adjust(offset, dir));
      position += Number(offset);
    },
    screenOffset: () => ({ top: span.offsetTop, left: span.offsetLeft }),
    makeEndOfSelection: () => { span.classList.add('selection-end'); },
    removeFromSelection: () => {
      span.classList.remove('selection-beg'); // TODO: remove both or check
      span.classList.remove('selection-end'); // TODO: and remove only one?
    }
  };
})();
