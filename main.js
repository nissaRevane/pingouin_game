const canvas = document.getElementById('pingouinGameMaps');
const pingouinGameStart = document.getElementById('pingouinGameStart');
const selectPlayers = document.getElementById('playerNumber');

const floeItemSize = 40;
const nbRow = 8, nbColumn = 15;

function startPingouinGame() {
  let playerNumber = selectPlayers.options[selectPlayers.selectedIndex].value;
  managePingouinGameStart();
  players = createPlayers(playerNumber);

  pingouinGame = new PingouinGame(
    canvas, floeItemSize, nbRow, nbColumn, players
  );
  pingouinGame.start();
}

function managePingouinGameStart() {
  if (pingouinGameStart.dataset.state == 'start') {
    pingouinGameStart.innerHTML = 'NEW GAME';
    pingouinGameStart.dataset.state = 'newGame';
  }
}

function createPlayers(playerNumber) {
  let pingouinPlayerRecap = document.getElementById('pingouinPlayerRecap');
  pingouinPlayerRecap.innerHTML = '';
  let players = [];
  for (let i=0; i<playerNumber; i++) {
    let pingouinNumber = 6-playerNumber;
    let player = new Player(i, pingouinNumber);
    players.push(player);
    pingouinPlayerRecap.appendChild(player.createPlayerMenu());
  }
  return players;
}
