const $canvas = document.querySelector('#game'),
  $game = $canvas.getContext('2d');

let canvasSize,
    elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  $canvas.setAttribute('width', canvasSize);
  $canvas.setAttribute('height', canvasSize);

  elementsSize = (canvasSize / 10);

  startGame();
}

function startGame() {
  console.log(canvasSize, elementsSize);

  $game.font = elementsSize + 'px Verdana';

  for (let i = 0; i < 10; i++) {
    $game.fillText(emojis['X'], elementsSize * i, elementsSize);
  }

}