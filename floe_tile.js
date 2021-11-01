const pi = Math.PI
const fishImages = ['fish1Image', 'fish2Image', 'fish3Image'];
const pingouinImage = document.getElementById('penguinImage');

class FloeTile {
  constructor(ctx, x, y, size, fishNumber, player = null, selected = false) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
    this.fishNumber = fishNumber;
    this.player = player;
    this.selected = selected;
  };

  draw = () => {
    this.ctx.beginPath();

    for (let side = 0; side < 7; side++) {
      this.ctx.lineTo(
        this.x + this.size * Math.cos(side * pi/3 + pi/6),
        this.y + this.size * Math.sin(side * pi/3 + pi/6)
      );
    }

    this.ctx.fillStyle = this.tileColor();
    this.ctx.fill();

    this.ctx.drawImage(
      this.tileImage(),
      this.x - this.size/2, this.y - this.size/2,
      this.size, this.size
    );
  };

  // Private

  tileImage = () => {
    if (this.player) { return pingouinImage; }
    return document.getElementById(fishImages[this.fishNumber - 1]);
  }

  tileColor = () => {
    if (this.player) {
      if (this.selected) {
        return this.player.color().replaceAll('0', '5');
      }
      return this.player.color();
    }

    let red = (150+20*this.fishNumber).toString();
    let green = (130+40*this.fishNumber).toString();
    let blue = '255';
    return `rgb(${red},${green},${blue})`;
  }
};
