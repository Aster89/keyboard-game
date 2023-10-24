let text = (function() {

  let makeSpan = text => {
    let s = document.createElement('span');
    s.appendChild(document.createTextNode(text));
    return s;
  };

  let plain_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis nec lectus at bibendum. Fusce porttitor lacus a urna rutrum, in volutpat risus viverra. Donec sagittis elit vehicula, porttitor dui at, luctus dolor. Sed ultrices est quis lectus pretium fermentum. Proin facilisis, ligula sed pulvinar porta, orci tortor aliquet eros, vitae interdum neque elit non nisi. Etiam ut accumsan est. Donec cursus erat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras urna velit, venenatis non urna imperdiet, dignissim iaculis nunc. Etiam accumsan, ligula vitae malesuada posuere, metus elit vestibulum mauris, pellentesque gravida lectus nisi vel elit. Fusce turpis eros, vehicula et sapien vitae, fringilla venenatis quam. Aliquam auctor posuere dui a eleifend. Duis velit nisl, laoreet sit amet quam at, pharetra feugiat neque. Phasellus imperdiet sodales ligula vitae tincidunt. Curabitur a maximus dui, id imperdiet enim. Vivamus vitae molestie leo.
In bibendum, sem nec lacinia ornare, ex elit aliquam felis, accumsan aliquet metus orci quis ex. In hac habitasse platea dictumst. Cras imperdiet tortor ac eros posuere vestibulum. Proin vitae malesuada neque. Etiam facilisis euismod nisi. Morbi id sem vestibulum, malesuada diam ac, rutrum velit. Nunc non felis sit amet mauris volutpat rhoncus non a odio. Integer nulla dolor, fermentum sed mi in, pharetra convallis sem. Vivamus maximus nisl nec elit bibendum scelerisque. Fusce quam nisi, vulputate ac mattis accumsan, congue et nisi. Sed pretium gravida ligula efficitur cursus. Donec faucibus molestie mi, sit amet luctus metus fringilla in. Nam eleifend ut diam ac sollicitudin. Integer sit amet risus id risus dictum tincidunt id vitae tellus. Nulla ac imperdiet est. Proin mauris lacus, viverra et purus id, dignissim vehicula est.`;

  let paragraph = document.createElement('p');
  paragraph.id = 'tokenized-text';

  plain_text
    .split('\n')
    .flatMap(line => line.split('')
                         .map(makeSpan)
                         .concat(document.createElement('br')))
    .forEach(elem => { paragraph.appendChild(elem); });

  console.assert(plain_text.length + 1/* trailing line break */ == paragraph.children.length);

  document.body.insertBefore(paragraph, keyboard);

  let addClassAt = (cl, pos) => { paragraph.children[pos].classList.add(cl); };

  return {
    plain: () => plain_text,
    chars: () => Array.from(paragraph.children)
                       .map(e => ({ ch: e.tagName == 'SPAN' ? e.getInnerHTML() : null,
                                    top: e.offsetTop,
                                    left: e.offsetLeft })),
    length: () => paragraph.children.length,
    insertAt: (newnode, pos) => { paragraph.insertBefore(newnode, paragraph.children[pos]); },
    addClassAt: addClassAt,
    markAsTrailSpace: pos => addClassAt('trailing-space', pos)
  };
})();
