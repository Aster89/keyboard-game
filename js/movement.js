let movement_keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

function stride(dir) {
  "use strict";
  return dir == 1
    ? RegExp(/^ *([a-zA-Z0-9]+|.|\n)/).exec(text.plain().substr(cursor.pos()))[0].length
    : RegExp(/([a-zA-Z0-9]+|.|\n) *$/).exec(text.plain().substr(0, cursor.pos()))[0].length;
}

let higher_lefter = (ch, cur) => ch.top < cur.top && ch.left < cur.left;
let lower_rigther = (ch, cur) => ch.top > cur.top && ch.left > cur.left;

function movecursor(e) {
  "use strict";
  if (e.shiftKey && !selection.active()) {
    selection.start();
  }
  if (!e.shiftKey && selection.active()) {
    selection.clear();
  }
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let dir = e.key == 'ArrowLeft' ? -1 : 1;
    cursor.advance(e.ctrlKey ? stride(dir) : 1, dir);
  } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    // TODO: the approach here is very inefficient,
    // but I can do better.
    let offset = 0;
    if (e.key == 'ArrowUp') {
      offset = text.chars()
        .slice(0, cursor.pos())
        .reverse()
        .findIndex(c => c.ch !== null && higher_lefter(c, cursor.screenOffset()));
    } else {
      offset = text.chars()
        .slice(cursor.pos())
        .findIndex(elem => c.ch !== null && lower_rigther(elem, cursor.screenOffset()));
    }
    let dir = e.key == 'ArrowUp' ? -1 : 1;
    let candidates = [text.chars()[cursor.pos() + dir * offset - 1],
                      text.chars()[cursor.pos() + dir * offset]];
    let displs = candidates
      .map(e => e.left)
      .map(minus(cursor.screenOffset().left))
      .map(Math.abs);
    let winner = displs.indexOf(Math.min(...displs));
    cursor.advance(offset + dir * (winner - (dir + 1)/2 - 1), dir);
  } else if (['Home', 'End'].includes(e.key)) {
    if (e.key == 'Home') {
      /* TODO: I need to allow the cursor to be at the beginning of the line as
       * well as at the end, but without the need of hitting End on the
       * previous line first
      cursor.advance(text.chars()
        .slice(0, cursor.pos())
        .reverse()
        .findIndex(c => cursor.screenOffset().left < c.left), -1);
        */
    } else {
      cursor.advance(
        text.chars()
            .slice(cursor.pos())
            .findIndex(c => cursor.screenOffset().left > c.left) - 1, 1);

      // XXX: this is to make the cursor appear at the beginning of the newline
      // when it is after the trailing space of a line
      let beforeCurs = cursor.pos() - 1;
      if (text.chars()[beforeCurs].ch == ' ') {
        text.markAsTrailSpace(beforeCurs);
        cursor.advance(1, -1);
      }
    }
  }
  if (selection.active()) {
    if (selection.forward() && selection.begin_pos() > cursor.pos()
      || selection.backward() && selection.begin_pos() <= cursor.pos()) {
      selection.invert();
    }
  }
}
