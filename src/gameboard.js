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
    let shipLocations = [];

    if (!xInRange || !yInRange || coordinate.length > 2) {
      return 0;
    }

    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        const newY = y + i;
        const newY_InRange = newY >= 0 && newY <= 9;

        if (!xInRange || !newY_InRange) {
          shipLocations = [];
          return 0;
        }
        shipLocations.push(newY);
        shipLocations.forEach((shipLocationX) => {
          this.nodes[x][shipLocationX] = ship;
          this.inactiveNodes.push(shipLocationX + y);
        });
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const newX = yNodes.indexOf(x) + i;
        const newX_InRange = newX < yNodes.length;

        if (!newX_InRange || !yInRange) {
          shipLocations = [];
          return 0;
        }
        shipLocations.push(yNodes[newX]);
        shipLocations.forEach((shipLocationY) => {
          this.nodes[shipLocationY][y] = ship;
          this.inactiveNodes.push(x + shipLocationY);
        });
      }
    }
    return 1;
  }

  receiveAttack(coordinates) {
    const x = coordinates[0];
    const y = +coordinates[1];

    if (typeof this.nodes[x][y] === "object") {
      this.nodes[x][y].hit();
      return;
    }
    this.missedShots.push(coordinates);
    this.inactiveNodes.push(coordinates);
  }

  // TODO

  // gameHasEnded() {}
  // coordinateTransform() {}
};