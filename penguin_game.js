class PenguinGame {
  constructor(canvas, floeTileSize, nbRow, nbColumn, players) {
    this.canvas = canvas;
    this.floe = new Floe(canvas, floeTileSize, nbRow, nbColumn);
    this.players = players;
    this.turn = 0;
    this.selectedPenguin = null;
  };

  start = () => {
    this.floe.draw();

    this.canvas.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      let canvasPosition = this.canvas.getBoundingClientRect();
      let inputX = event.pageX - canvasPosition.left;
      let inputY = event.pageY - canvasPosition.top;

      let playerActivePenguinNumber = this.activePlayer().activePenguins.length;
      let playerPenguinNumber = this.activePlayer().penguinNumber;

      if (playerActivePenguinNumber < playerPenguinNumber) {
        this.tryToAddPenguin(inputX, inputY);
      } else if (!this.selectedPenguin) {
        this.tryToSelectPenguin(inputX, inputY);
      } else if (this.selectedPenguin) {
        this.tryToMovePenguin(inputX, inputY);
      }
    });
  }

  // Private

  tryToAddPenguin = (inputX, inputY) => {
    let coordinates = this.floe.addPenguin(inputX, inputY, this.activePlayer());
    if (coordinates) {
      let row = coordinates.row;
      let column = coordinates.column;

      this.addActivePenguinToPlayer(row, column);
      this.turn++;
    }
  }

  tryToSelectPenguin = (inputX, inputY) => {
    let floeTileSelected = this.floe.findFloeTileByPosition(inputX, inputY);
    if (!floeTileSelected) { return }
    if (!floeTileSelected.player) { return }

    let activePlayer = this.activePlayer();
    if (floeTileSelected.player.order === activePlayer.order) {
      let coordinates = this.floe.positionToCoordinates(inputX, inputY);
      if (!coordinates) { return }
      let row = coordinates.row;
      let column = coordinates.column;

      let selectedPenguin = activePlayer.findPenguinByCoordinates(row, column);
      if (selectedPenguin) {
        this.floe.selectPenguin(row, column, activePlayer);
        this.selectedPenguin = selectedPenguin;
      }
    }
  }

  tryToMovePenguin = (inputX, inputY) => {
    let floeTileSelected = this.floe.findFloeTileByPosition(inputX, inputY);
    if (!floeTileSelected) { return }
    if (floeTileSelected.player) { return }

    let activePlayer = this.activePlayer();
    let endCoordinates = this.floe.positionToCoordinates(inputX, inputY);
    if (!endCoordinates) { return }
    let endRow = endCoordinates.row;
    let endColumn = endCoordinates.column;

    if (this.moveIsPossible(endRow, endColumn)) {
      this.floe.movePenguin(this.selectedPenguin, endRow, endColumn);
      this.selectedPenguin = null;
      this.turn ++;

    }
  }

  activePlayer = () => {
    return this.players[this.turn%this.players.length];
  }

  addActivePenguinToPlayer = (row, column) => {
    this.activePlayer().activePenguins.push(
      new Penguin(row, column, this.activePlayer())
    );
  }

  moveIsPossible = (endRow, endColumn) => {
    let deltaRow = endRow - this.selectedPenguin.row;
    let deltaColumn = endColumn - this.selectedPenguin.column;
    if ([0, deltaColumn, -1 * deltaColumn].includes(deltaRow)) {
      return true;
    }
    return false;
  }
};
