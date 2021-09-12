class PingouinGame {
  constructor(canvas, floeItemSize, nbRow, nbColumn, players) {
    this.canvas = canvas;
    this.floe = new Floe(canvas, floeItemSize, nbRow, nbColumn);
    this.players = players;
    this.turn = 0;
  };

  start = () => {
    this.floe.draw();

    this.canvas.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      let canvasPosition = this.canvas.getBoundingClientRect();
      let inputX = event.pageX - canvasPosition.left;
      let inputY = event.pageY - canvasPosition.top;

      let playerActivePingouinNumber = this.activePlayer().activePingouinNumber;
      let playerPingouinNumber = this.activePlayer().pingouinNumber;

      if (playerActivePingouinNumber < playerPingouinNumber) {
        this.tryToAddPingouin(inputX, inputY);
      }
    });
  }

  // Private

  tryToAddPingouin = (inputX, inputY) => {
    if (this.floe.addPingouin(inputX, inputY, this.activePlayer())) {
      this.addActivePingouinToPlayer();
      this.turn++;
      return true;
    }
    return false;
  }

  activePlayer = () => {
    return this.players[this.turn%this.players.length];
  }

  addActivePingouinToPlayer = () => {
    this.players[this.turn%this.players.length].activePingouinNumber++;
  }
};
