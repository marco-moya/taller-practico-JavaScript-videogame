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

  elementsSize = (canvasSize / 10) - 1;

  startGame();
}

function startGame() { 
  $game.font = elementsSize + 'px Verdana';
  $game.textAlign = 'start'

  const map = maps[1];
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map(row => row.trim().split(""));
  console.log(mapRows, mapRowsCols);

  mapRowsCols.forEach((row, indexRow) => {
    row.forEach((col, indexCol) => {
      const emoji = emojis[col];
      const posX = elementsSize * indexCol - 4;
      const posY = elementsSize * (indexRow + 1) -4;
      $game.fillText(emoji, posX, posY);
      console.log({row, col});
    });
  });

  // for (let x = 1; x <= 10; x++) {
  //   for (let y = 1; y <= 10; y++) {
  //    $game.fillText(emojis[mapRowsCols[y - 1][x - 1]], elementsSize * x + 15, elementsSize * y - 4);
  //   }
  // }
}