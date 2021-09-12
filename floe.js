class Floe {
  constructor(canvas, floeItemSize, nbRow, nbColumn) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.floeItemSize = floeItemSize;
    this.nbRow = nbRow;
    this.nbColumn = nbColumn;
    this.distribution = [30, 20, 10];
    this.floeMap = this.createFloeMap();
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row = 0; row < this.nbRow; row++) {
      for (let column = 0; column < this.nbColumn; column++) {
        const floeItem = this.floeMap[row][column];
        if (floeItem) {floeItem.draw();}
      }
    }
  };

  addPenguin = (x, y, player) => {
    let mapCoordinates = this.selectValidCoordinates(x, y);
    if (mapCoordinates) {
      let row = mapCoordinates.row;
      let column = mapCoordinates.column;
      this.floeMap[row][column].player = player;
      this.draw();
      return true;
    }
    return false;
  }

  // Private

  createFloeMap = () => {
    let floeMap = [];

    for (let row = 0; row < this.nbRow; row++) {
      floeMap.push([]);

      const y = (1.8*row + 1) * this.floeItemSize;
      for (let column = 0; column < this.nbColumn; column++) {
        floeMap[row].push(null);

        if (this.coordinatesAreValid(row, column)) {
          const x = (column + 1) * this.floeItemSize;
          const floeItem = this.createRandomizeFloeItem(x, y);
          floeMap[row][column] = floeItem;
        } else {
          floeMap[row][column] = null;
        }
      }
    }

    return floeMap;
  }

  coordinatesAreValid = (row, column) => {
    return (row+column)%2;
  }

  createRandomizeFloeItem = (x, y) => {
    const rdm = Math.random() * this.floeItemRemaining();
    var fishNumber = 2;

    if (rdm < this.distribution[0]){
      fishNumber = 1;
    } else if (rdm > this.distribution[0] + this.distribution[1]){
      fishNumber = 3;
    }
    this.distribution[fishNumber-1] += -1;

    return new FloeItem(this.ctx, x, y, this.floeItemSize, fishNumber, false);
  }

  floeItemRemaining = () => {
    return this.distribution[0] + this.distribution[1] + this.distribution[2];
  }

  selectValidCoordinates = (x, y) => {
    const floorRow = Math.floor(((y/this.floeItemSize)-1)/1.8);
    const floorColumn = Math.floor((x/this.floeItemSize)-1);

    for (let row = floorRow; row <= floorRow+1; row++) {
      for (let column = floorColumn; column <= floorColumn+1; column++) {
        if (this.floeMap[row] && this.floeMap[row][column]) {
          if(!this.floeMap[row][column].player){
            const floeItem = this.floeMap[row][column];
            const deltaX = floeItem.x-x;
            const deltaY = floeItem.y-y;
            const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);

            if (distance < Math.pow(this.floeItemSize, 2)) {
              return {row: row, column: column};
            }
          }
        }
      }
    }
    return null;
  }
};
