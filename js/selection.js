function makeSelection() {
  "use strict";
  let active = false;
  let dir = 1;
  let anchor = undefined;
  let tokens = document.getElementById('tokenized-text').children;
  return {
    forward: () => dir == 1,
    backward: () => dir == -1,
    active: () => active,
    toggle: () => {
      if (active) {
        active = false;
        tokens[anchor].classList.remove('selection-anchor');
      } else {
        active = true;
        anchor = cursor.pos();
        tokens[anchor].classList.add('selection-anchor');
      }
    }
  };
}
