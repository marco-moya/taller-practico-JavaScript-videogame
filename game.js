const d = document;
const $canvas = d.querySelector('#game'),
  $game = $canvas.getContext('2d'),
  $btnUp = d.querySelector('#up'),
  $btnLeft = d.querySelector('#left'),
  $btnRight = d.querySelector('#right'),
  $btnDown = d.querySelector('#down'),
  playerPosition = {
    x: undefined,
    y: undefined,
  };
  
let canvasSize,
  elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = Math.floor(window.innerWidth * 0.8);
  } else {
    canvasSize = Math.floor(window.innerHeight * 0.8);
  }

  $canvas.setAttribute('width', canvasSize);
  $canvas.setAttribute('height', canvasSize);

  elementsSize = (canvasSize / 10);

  startGame();
}

function startGame() { 
  $game.font = elementsSize + 'px Verdana';
  $game.textAlign = 'end'
  const map = maps[0];
  // Usando trim para eliminar los espacios vacíos laterales del elemento map y el metodo split para convertir el string en un nuevo array a partir de los saltos de linea "\n".
  const mapRows = map.trim().split("\n");
  // Usando el metodo array.map comvertimos cada elemento del mapRow en un array cuyo elementos son serados por el metodo split.
  const mapRowsCols = mapRows.map(row => row.trim().split(""));
  
  $game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowsCols.forEach((row, indexRow) => {
    row.forEach((col, indexCol) => {
      const emoji = emojis[col];
      const posX = elementsSize * (indexCol + 1);
      const posY = elementsSize * (indexRow + 1);

      if (col === 'O') {
        if (playerPosition.x === undefined && playerPosition.y === undefined) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      }

      $game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  $game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
  console.log(elementsSize);
  console.log(canvasSize);
  console.log('x', playerPosition.x);
  console.log('y', playerPosition.y);
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
});

function moveUp() {
  if (playerPosition.y > elementsSize)
  playerPosition.y -= elementsSize;
  startGame();
}
function moveLeft() {
  if (playerPosition.x > elementsSize)
  playerPosition.x -= elementsSize;
  startGame();
}
function moveRight() {
  if (playerPosition.x < canvasSize)
  playerPosition.x += elementsSize;
  startGame();
}
function moveDown() {
  if (playerPosition.y < canvasSize)
  playerPosition.y += elementsSize;
  startGame();
}