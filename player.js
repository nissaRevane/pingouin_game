class Player {
  constructor(order, penguinNumber) {
    this.order = order;
    this.penguinNumber = penguinNumber;
    this.activePenguins = [];
    this.score = 0;
  };

  name = () => {
    if(this.order == 0){ return 'RED'; }
    if(this.order == 1){ return 'GREEN'; }
    if(this.order == 2){ return 'BLUE'; }
    return 'YELLOW';
  }

  color = () => {
    if(this.order == 0){ return '#F00'; }
    if(this.order == 1){ return '#0F0'; }
    if(this.order == 2){ return '#00F'; }
    return '#FF0';
  }

  createPlayerMenu = () => {
    let playerLine = document.createElement('tr');
    let playerName = document.createElement('th');
    playerName.style.color = this.color();
    playerName.innerHTML = this.name();
    playerLine.appendChild(playerName);
    for (let i=0; i<this.penguinNumber; i++) {
      let penguin = document.createElement('td');
      penguin.style.backgroundColor = this.color();
      penguin.innerHTML = i;
      playerLine.appendChild(penguin);
    }
    return playerLine;
  }

  findPenguinByCoordinates = (row, column) => {
    let penguin = null;
    this.activePenguins.forEach(activePenguin => {
      if (activePenguin.row === row && activePenguin.column === column) {
        activePenguin.selected = true;
        penguin = activePenguin;
      }
    });
    return penguin;
  }
};
