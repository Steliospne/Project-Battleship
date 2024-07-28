const Ship = require("./ship");

module.exports = class Gameboard {
  constructor() {
    this.nodes = {};
    this.missedShots = [];
    this.inactiveNodes = [];
    this.init();
  }

  init() {
    for (let x = 0; x < 10; x++) {
      const yAxis = String.fromCharCode(97 + x);
      this.nodes[yAxis] = [];

      // for visualization purposes
      // ******************************
      for (let i = 0; i < 10; i++) {
        this.nodes[yAxis].push(0);
      }
      // ******************************

      // for production uncomment the following line.
      // this.nodes[yAxis] = Array(10);
    }
    console.table(this.nodes);
  }

  placeShip(coordinate, ship) {
    const nodeY = Object.keys(this.nodes);
    const isInRangeX = nodeY.includes(coordinate[0]);
    const isInRangeY = +coordinate[1] < 0 || +coordinate[1] > 9;

    if (!(isInRangeX || isInRangeY)) {
      return;
    }
  }

  // TODO

  // gameHasEnded() {}
  // coordinateTransform() {}
  // receiveAttack() {}
};
