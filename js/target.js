function makeTargetSelection(from, to) {
  "use strict";
  [from, to]
    .sort((a, b) => a - b)
    .map((pos, i) => text.addClassAt(['target-selection-beg', 'target-selection-end'][i], pos));
}

function makeRndTargetSelection() {
  "use strict";
  makeTargetSelection(
    Math.floor(Math.random() * text.length()),
    Math.floor(Math.random() * text.length()));
}
