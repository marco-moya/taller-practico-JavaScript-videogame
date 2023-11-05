const d = document;
const $canvas = d.querySelector('#game'),
  $game = $canvas.getContext('2d'),
  $btnUp = d.querySelector('#up'),
  $btnLeft = d.querySelector('#left'),
  $btnRight = d.querySelector('#right'),
  $btnDown = d.querySelector('#down');

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

  elementsSize = (canvasSize / 10) - 1;

  startGame();
}

function startGame() { 
  $game.font = elementsSize + 'px Verdana';
  $game.textAlign = 'start'

  const map = maps[1];
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map(row => row.trim().split(""));
  //console.log(mapRows, mapRowsCols);

  mapRowsCols.forEach((row, indexRow) => {
    row.forEach((col, indexCol) => {
      const emoji = emojis[col];
      const posX = elementsSize * indexCol - 4;
      const posY = elementsSize * (indexRow + 1) -4;
      $game.fillText(emoji, posX, posY);
      //console.log({row, col});
    });
  });

  // for (let x = 1; x <= 10; x++) {
  //   for (let y = 1; y <= 10; y++) {
  //    $game.fillText(emojis[mapRowsCols[y - 1][x - 1]], elementsSize * x + 15, elementsSize * y - 4);
  //   }
  // }
}

d.addEventListener('click', (e) => {
  if (e.target.matches('#up')) moveUp();
  if (e.target.matches('#left')) moveLeft();
  if (e.target.matches('#right')) moveRight();
  if (e.target.matches('#down')) moveDown();
});

d.addEventListener('keydown', e => {
  if (e.keyCode === 38) moveUp();
  if (e.keyCode === 37) moveLeft();
  if (e.keyCode === 39) moveRight();
  if (e.keyCode === 40) moveDown();
})

function moveUp() {
  console.log('mover hacia arriba');
}
function moveLeft() {
  console.log('mover hacia izquierda');
}
function moveRight() {
  console.log('mover hacia derecha');
}
function moveDown() {
  console.log('mover hacia abajo');
}