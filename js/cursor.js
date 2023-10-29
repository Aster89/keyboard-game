let cursor = (function(){
  "use strict";

  let chars = text.chars();

  // initialize cursor
  let position = Math.floor(Math.random() * text.length());
  position = 252;
  text.addClassAt('cursor', position);
  text.addPosAt(position);

  return {
    pos: () => position,
    advance: (steps, dir) => {
      let offset = steps * dir;
      let newposition = position + offset;
      text.removeClassAt('cursor', position);
      text.removeClassAt('selection-head', position);
      text.removePosAt(position);
      text.addClassAt('cursor', newposition);
      text.addClassAt('selection-head', newposition);
      text.addPosAt(newposition);
      position += Number(offset);
    },
    screenOffset: () => ({ top: chars[position].top,
                           left: chars[position].left }),
    makeEndOfSelection: () => { text.addClassAt('selection-head', position); },
    removeFromSelection: () => { text.removeClassAt('selection-head', position); }
  };
})();
