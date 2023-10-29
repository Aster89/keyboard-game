[Math.floor(Math.random() * text.length()), Math.floor(Math.random() * text.length())]
  .sort((a, b) => a - b)
  .map((pos, i) => text.addClassAt(['target-selection-beg', 'target-selection-end'][i], pos));
