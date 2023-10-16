function move(key) {
  if (['ArrowLeft', 'ArrowRight'].includes(key)) {
    let tokens = document.getElementById('tokenized-text');
    if (key == 'ArrowLeft') {
      let offset = cursor.getAttribute('pos') - 1;
      tokens.insertBefore(cursor, tokens.children[offset]);
      cursor.setAttribute('pos', offset);
    } else {
      let offset = Number(cursor.getAttribute('pos')) + 1;
      tokens.insertBefore(cursor, tokens.children[offset + 1]);
      cursor.setAttribute('pos', offset);
    }
  }
}
