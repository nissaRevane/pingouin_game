class Player {
  constructor(order, pingouinNumber) {
    this.order = order;
    this.pingouinNumber = pingouinNumber;
    this.activePingouinNumber = 0;
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
    for (let i=0; i<this.pingouinNumber; i++) {
      let pingouin = document.createElement('td');
      pingouin.style.backgroundColor = this.color();
      pingouin.innerHTML = i;
      playerLine.appendChild(pingouin);
    }
    return playerLine;
  }
};
