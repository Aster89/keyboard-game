function makeCursor() {
  "use strict";

  let chars = text.chars();

  // initialize cursor
  let position = Math.floor(Math.random() * text.length());
  position = 1;
  text.addClassAt('cursor', position);
  text.addPosAt(position);

  return {
    pos: () => position,
    advance: (steps, dir) => {
      let offset = steps * dir;
      let newposition = position + offset;
      text.removeClassAt('cursor', position);
      text.removePosAt(position);
      text.addClassAt('cursor', newposition);
      text.addPosAt(newposition);
      position += Number(offset);
    },
    screenOffset: () => ({ top: chars[position].top,
                           left: chars[position].left }),
  };
}
