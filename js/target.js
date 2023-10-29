function makeTargetSelection(from, to) {
  [from, to]
    .sort((a, b) => a - b)
    .map((pos, i) => text.addClassAt(['target-selection-beg', 'target-selection-end'][i], pos));
}

function makeRndTargetSelection() {
  makeTargetSelection(
    Math.floor(Math.random() * text.length()),
    Math.floor(Math.random() * text.length()));
}
