const d = document,
  $canvas = d.querySelector('#game'),
  $game = $canvas.getContext('2d'),
  $btnUp = d.querySelector('#up'),
  $btnLeft = d.querySelector('#left'),
  $btnRight = d.querySelector('#right'),
  $btnDown = d.querySelector('#down'),
  $spanLives = d.querySelector('#lives'),
  $spanTime = d.querySelector('#time'),
  playerPosition = {
    x: undefined,
    y: undefined,
  },
  giftPosition = {
    x: undefined,
    y: undefined,
  };
  
  let canvasSize,
    elementsSize,
    enemyPosition = [],
    level = 0,
    lives = 3,
    timeStart,
    timeInterval,
    timePlayer;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
    canvasSize = Math.trunc(canvasSize);
  } else {
    canvasSize = window.innerHeight * 0.8;
    canvasSize = Math.trunc(canvasSize);
  }

  $canvas.setAttribute('width', canvasSize);
  $canvas.setAttribute('height', canvasSize);

  elementsSize = (canvasSize / 10);
  elementsSize = Math.round(parseFloat(elementsSize.toFixed(2)));

  startGame();
}

function startGame() { 
  $game.font = elementsSize + 'px Verdana';
  $game.textAlign = 'end'
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
  }

  const mapRows = map.trim().split("\n"); // Usando trim para eliminar los espacios vacíos laterales del elemento map y el metodo split para convertir el string en un nuevo array a partir de los saltos de linea "\n".
  const mapRowsCols = mapRows.map(row => row.trim().split("")); // Usando el metodo array.map comvertimos cada elemento del mapRow en un array cuyo elementos son creados por el metodo split.
  
  enemyPosition = []; //limpia el array para no duplicar las colisiones cada vez que el jugador se mueve. 
  $game.clearRect(0, 0, canvasSize, canvasSize); //limpia el mapa cada vez que el jugador se mueve.
  mapRowsCols.forEach((row, indexRow) => {
    row.forEach((col, indexCol) => {
      const emoji = emojis[col];
      const posX = elementsSize * (indexCol + 1);
      const posY = elementsSize * (indexRow + 1);

      if (col === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col === 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === 'X') {
        enemyPosition.push({x: posX, y: posY})
      } 


      $game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
  showLives();
}

function movePlayer() {
  $game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);

  const gifCollitionX = playerPosition.x == giftPosition.x;
  const gifCollitionY = playerPosition.y == giftPosition.y;
  const gifCollition = gifCollitionX && gifCollitionY
  if (gifCollition) {
    levelWin();
  }
  
  const enemyColition = enemyPosition.find(enemy => {
    const enemyColitionX = enemy.x == playerPosition.x;
    const enemyColitionY = enemy.y == playerPosition.y;
    return enemyColitionX && enemyColitionY;
  })
  if (enemyColition) {
    console.log('Chocaste');
    levelFail();
  };
}

function levelWin() {
  console.log('subiste de nivel');
  level += 1;
  startGame();
}

function levelFail() {
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  lives -= 1;
  console.log(lives);
  if (lives === 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  startGame();
}

function gameWin() {
  console.log('Terminaste el juego');
  clearInterval(timeInterval);
}

function showLives() {
  $spanLives.innerHTML = emojis.HEART.repeat(lives);
}

function showTime() {
  $spanTime.innerHTML = Date.now() - timeStart;
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