class PenguinGame {
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

      let playerActivePenguinNumber = this.activePlayer().activePenguinNumber;
      let playerPenguinNumber = this.activePlayer().penguinNumber;

      if (playerActivePenguinNumber < playerPenguinNumber) {
        this.tryToAddPenguin(inputX, inputY);
      }
    });
  }

  // Private

  tryToAddPenguin = (inputX, inputY) => {
    if (this.floe.addPenguin(inputX, inputY, this.activePlayer())) {
      this.addActivePenguinToPlayer();
      this.turn++;
      return true;
    }
    return false;
  }

  activePlayer = () => {
    return this.players[this.turn%this.players.length];
  }

  addActivePenguinToPlayer = () => {
    this.players[this.turn%this.players.length].activePenguinNumber++;
  }
};
