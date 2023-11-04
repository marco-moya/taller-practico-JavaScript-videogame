const $canvas = document.querySelector('#game'),
  game = $canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
  let canvasSize;

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  $canvas.setAttribute('width', canvasSize);
  $canvas.setAttribute('height', canvasSize);

  const elementsSize = (canvasSize / 10);

  console.log(canvasSize, elementsSize);

  game.font = elementsSize + 'px Verdana';

  for (let i = 0; i < 10; i++) {
    game.fillText(emojis['X'], elementsSize * i, elementsSize);
  }

}
console.log(window.innerWidth, window.innerHeight);