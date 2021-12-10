class Player {
  constructor(order, penguinNumber) {
    this.order = order;
    this.penguinNumber = penguinNumber;
    this.activePenguins = [];
    this.name = this.name();
    this.score = 0;
  };

  name = () => {
    if(this.order === 0){ return 'red'; }
    if(this.order === 1){ return 'green'; }
    if(this.order === 2){ return 'blue'; }
    return 'yellow';
  }

  color = () => {
    if(this.order === 0){ return '#F00'; }
    if(this.order === 1){ return '#0F0'; }
    if(this.order === 2){ return '#00F'; }
    return '#FF0';
  }

  createPlayerMenu = () => {
    let playerLine = document.createElement('tr');
    playerLine.appendChild(this.menuName());

    for (let i=0; i<this.penguinNumber; i++) {
      playerLine.appendChild(this.penguinToken(i));
    }
    return playerLine;
  }

  menuName = () => {
    let playerName = document.createElement('th');

    playerName.setAttribute(
      'id',
      `menuName${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
    );

    playerName.style.color = this.color();
    if (this.order === 0) { playerName.style.textShadow = '0px 0px 8px #FFF'; }
    playerName.innerHTML = this.name.toUpperCase();

    return playerName;
  }

  penguinToken = (tokenNumber) => {
    let penguinToken = document.createElement('td');
    penguinToken.style.backgroundColor = this.color();
    penguinToken.innerHTML = tokenNumber;
    return penguinToken;
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
