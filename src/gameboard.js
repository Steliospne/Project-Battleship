const Ship = require("./ship");

module.exports = class Gameboard {
  constructor() {
    this.nodes = {};
    this.missedShots = [];
    this.inactiveNodes = [];
    this.hits = [];

    this.fleet = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };

    this.init();
  }

  init() {
    for (let x = 0; x < 10; x++) {
      const yAxis = String.fromCharCode(97 + x);
      this.nodes[yAxis] = [];

      // for visualization purposes
      // ******************************
      // for (let i = 0; i < 10; i++) {
      //   this.nodes[yAxis].push(0);
      // }
      // ******************************

      // for production uncomment the following line.
      this.nodes[yAxis] = Array(10);
    }
  }

  placeShip(coordinate, ship) {
    const x = coordinate[0];
    const y = Number(coordinate[1]);
    const yNodes = Object.keys(this.nodes);
    const xInRange = yNodes.includes(x);
    const yInRange = y >= 0 && y <= 9;
    let shipLocations = [];
    const shipLocation = [];

    if (
      !xInRange ||
      !yInRange ||
      coordinate.length > 2 ||
      typeof this.nodes[x][y] === "object"
    ) {
      return 0;
    }

    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        const newY = y + i;
        const newY_InRange = newY >= 0 && newY <= 9;

        if (
          !xInRange ||
          !newY_InRange ||
          typeof this.nodes[x][newY] === "object"
        ) {
          shipLocations = [];
          return 0;
        }
        shipLocations.push(newY);
      }
      shipLocations.forEach((shipLocationY) => {
        this.nodes[x][shipLocationY] = ship;
        shipLocation.push(x + shipLocationY);
      });
    } else {
      for (let i = 0; i < ship.length; i++) {
        const newX = yNodes.indexOf(x) + i;
        const newX_InRange = newX < yNodes.length;

        if (
          !newX_InRange ||
          !yInRange ||
          typeof this.nodes[yNodes[newX]][y] === "object"
        ) {
          shipLocations = [];
          return 0;
        }
        shipLocations.push(yNodes[newX]);
      }
      shipLocations.forEach((shipLocationX) => {
        this.nodes[shipLocationX][y] = ship;
        shipLocation.push(shipLocationX + y);
      });
    }
    return [1, shipLocation];
  }

  receiveAttack(coordinates) {
    const x = coordinates[0];
    const y = +coordinates.slice(1) - 1;
    if (typeof this.nodes[x][y] === "object") {
      this.inactiveNodes.push(coordinates);
      this.hits.push(coordinates);
      this.nodes[x][y].hit();
      return;
    }
    this.missedShots.push(coordinates);
    this.inactiveNodes.push(coordinates);
  }

  isGameOver() {
    const ships = Object.values(this.fleet);
    let sunkShipCount = 0;

    for (const ship of ships) {
      if (ship.isSunk()) {
        sunkShipCount++;
      }
    }
    return sunkShipCount === ships.length ? true : false;
  }
};
