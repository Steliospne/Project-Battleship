module.exports = class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.orientation = "horizontal";
  }

  isSunk() {
    return this.hits === this.length ? true : false;
  }

  hit() {
    this.hits++;
  }
};
