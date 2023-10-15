let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Morbi convallis nec lectus at bibendum. Fusce porttitor lacus a urna rutrum, in volutpat risus viverra. Donec sagittis elit vehicula, porttitor dui at, luctus dolor. Sed ultrices est quis lectus pretium fermentum. Proin facilisis, ligula sed pulvinar porta, orci tortor aliquet eros, vitae interdum neque elit non nisi. Etiam ut accumsan est. Donec cursus erat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras urna velit, venenatis non urna imperdiet, dignissim iaculis nunc. Etiam accumsan, ligula vitae malesuada posuere, metus elit vestibulum mauris, pellentesque gravida lectus nisi vel elit. Fusce turpis eros, vehicula et sapien vitae, fringilla venenatis quam. Aliquam auctor posuere dui a eleifend. Duis velit nisl, laoreet sit amet quam at, pharetra feugiat neque.  Phasellus imperdiet sodales ligula vitae tincidunt. Curabitur a maximus dui, id imperdiet enim. Vivamus vitae molestie leo.
In bibendum, sem nec lacinia ornare, ex elit aliquam felis, accumsan aliquet metus orci quis ex.  In hac habitasse platea dictumst. Cras imperdiet tortor ac eros posuere vestibulum. Proin vitae malesuada neque. Etiam facilisis euismod nisi. Morbi id sem vestibulum, malesuada diam ac, rutrum velit. Nunc non felis sit amet mauris volutpat rhoncus non a odio. Integer nulla dolor, fermentum sed mi in, pharetra convallis sem. Vivamus maximus nisl nec elit bibendum scelerisque. Fusce quam nisi, vulputate ac mattis accumsan, congue et nisi.  Sed pretium gravida ligula efficitur cursus. Donec faucibus molestie mi, sit amet luctus metus fringilla in. Nam eleifend ut diam ac sollicitudin.  Integer sit amet risus id risus dictum tincidunt id vitae tellus. Nulla ac imperdiet est. Proin mauris lacus, viverra et purus id, dignissim vehicula est.`;
let textnode = document.createTextNode(text);

let makeSpan = text => {
  let s = document.createElement('span');
  s.appendChild(document.createTextNode(text));
  return s;
};

let makebreak = () => document.createElement('br');

let par = (() => {
  let p = document.createElement('p');
  p.classList.add('text');

  text
    .split('\n')
    .flatMap(line => line.split('').map(makeSpan).concat([makebreak(), makebreak()]))
    .forEach(elem => { p.appendChild(elem); });

  let keyboard = document.getElementsByTagName('body')[0].children[0];

  document.body.insertBefore(p, keyboard);
  return p;
})();

let chars = document.getElementsByClassName('text')[0].children.length;

let cursor = document.createElement('span');
cursor.classList.add('cursor');
cursor.classList.add('blinking');

let rndspan = par.children[Math.floor(Math.random() * chars)];

par.insertBefore(cursor, rndspan);
