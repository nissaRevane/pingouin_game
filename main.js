const canvas = document.getElementById('penguinGameMaps');
const penguinGameStart = document.getElementById('penguinGameStart');
const selectPlayers = document.getElementById('playerNumber');

const floeItemSize = 40;
const nbRow = 8, nbColumn = 15;

function startPenguinGame() {
  let playerNumber = selectPlayers.options[selectPlayers.selectedIndex].value;
  managePenguinGameStart();
  players = createPlayers(playerNumber);

  penguinGame = new PenguinGame(
    canvas, floeItemSize, nbRow, nbColumn, players
  );
  penguinGame.start();
}

function managePenguinGameStart() {
  if (penguinGameStart.dataset.state == 'start') {
    penguinGameStart.innerHTML = 'NEW GAME';
    penguinGameStart.dataset.state = 'newGame';
  }
}

function createPlayers(playerNumber) {
  let penguinPlayerRecap = document.getElementById('penguinPlayerRecap');
  penguinPlayerRecap.innerHTML = '';
  let players = [];
  for (let i=0; i<playerNumber; i++) {
    let penguinNumber = 6-playerNumber;
    let player = new Player(i, penguinNumber);
    players.push(player);
    penguinPlayerRecap.appendChild(player.createPlayerMenu());
  }
  return players;
}
