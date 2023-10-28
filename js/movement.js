let movement_keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

function stride(dir) {
  "use strict";
  return dir == 1
    ? RegExp(/^ *([^a-zA-Z0-9]|[a-zA-Z0-9]+|\n)/).exec(text.plain().substr(cursor.pos()))[0].length
    : RegExp(/([a-zA-Z0-9]*|.|\n) *$/).exec(text.plain().substr(0, cursor.pos()))[0].length;
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
  let chars = text.chars();
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    let dir = e.key == 'ArrowLeft' ? -1 : 1;
    if (dir == -1 && cursor.pos() == 0 || dir == 1 && text.length() == cursor.pos() + 1) {
      return;
    }
    cursor.advance(e.ctrlKey ? stride(dir) : 1, dir);
  } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    // TODO: the approach here is very inefficient,
    // but I can do better.
    let offset = 0;
    if (e.key == 'ArrowUp') {
      offset = chars
        .slice(0, cursor.pos())
        .reverse()
        .findIndex(c => c.ch !== null && higher_lefter(c, cursor.screenOffset()));
    } else {
      offset = chars
        .slice(cursor.pos())
        .findIndex(elem => c.ch !== null && lower_rigther(elem, cursor.screenOffset()));
    }
    let dir = e.key == 'ArrowUp' ? -1 : 1;
    let candidates = [chars[cursor.pos() + dir * offset - 1],
                      chars[cursor.pos() + dir * offset]];
    let displs = candidates
      .map(e => e.left)
      .map(minus(cursor.screenOffset().left))
      .map(Math.abs);
    let winner = displs.indexOf(Math.min(...displs));
    cursor.advance(offset + dir * (winner - 1), dir);
  } else if (['Home', 'End'].includes(e.key)) {
    if (e.key == 'Home') {
      if (cursor.pos() == 0 || chars[cursor.pos() - 1].ch === null || (chars[cursor.pos()].ch !== null && chars[cursor.pos() - 1].left > cursor.screenOffset().left)) {
        return;
      }
      cursor.advance(
        chars
          .slice(0, cursor.pos())
          .reverse()
          .findIndex((c, i, o) =>
            i == o.length - 1 || o[i+1].ch == null || c.left < o[i+1].left) + 1, -1);
    } else {
      if (cursor.pos() == chars.length - 1) {
        return;
      }
      cursor.advance(
        chars
            .slice(cursor.pos())
            .findIndex((c, i, o) => c.ch == null || c.left > o[i+1].left), 1);

      if (chars[cursor.pos() + 1].ch == null) {
        cursor.advance(1, 1);
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
