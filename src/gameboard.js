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
  }

  placeShip(coordinate, ship) {
    const x = coordinate[0];
    const y = Number(coordinate[1]);
    const yNodes = Object.keys(this.nodes);
    const xInRange = yNodes.includes(x);
    const yInRange = y >= 0 && y <= 9;
    const shipLocation = [];

    if (!xInRange || !yInRange || coordinate.length > 2) {
      return;
    }

    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        const newY = y + i;
        const newY_InRange = newY >= 0 && newY <= 9;

        if (!xInRange || !newY_InRange) {
          return;
        }
        this.nodes[x][newY] = 1;
        shipLocation.push(x + newY);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const newX = yNodes.indexOf(x) + i;
        const newX_InRange = newX <= yNodes.length;

        if (!newX_InRange || !yInRange) {
          return;
        }
        this.nodes[yNodes[newX]][y] = 1;
      }
    }
    return 1;
  }

  // TODO

  // gameHasEnded() {}
  // coordinateTransform() {}
  // receiveAttack() {}
};
