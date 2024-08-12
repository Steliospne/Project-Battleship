/* eslint-disable no-loop-func */
const Player = require("./player");

module.exports = class Computer extends Player {
  constructor(name, gameboard) {
    super();
    this.name = name;
    this.gameboard = gameboard;
    this.init();
  }
  init() {
    const ships = Object.values(this.gameboard.fleet);
    let counter = 0;
    while (counter < 5) {
      const ship = ships[counter];
      const shipLength = ship.length;
      let randomX;
      let randomY;
      let randomOrientation = Math.floor(Math.random() * 2);
      // if randomOrientation 1 then horizontal
      if (randomOrientation) {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * (10 - shipLength));
        randomX = String.fromCharCode(97 + randomX);
      } else {
        ship.isHorizontal = false;
        randomX = Math.floor(Math.random() * (10 - shipLength));
        randomX = String.fromCharCode(97 + randomX);
        randomY = Math.floor(Math.random() * 10);
      }

      const coordinates = randomX + randomY;
      const result = this.gameboard.placeShip(coordinates, ship)[0];
      if (result === 1) {
        counter++;
      }
      if (counter === 0) break;
      // console.log(coordinates, result, counter, ship);
    }
    // console.table(this.gameboard.nodes);
  }

  play() {
    let randomX;
    let randomY;
    randomX = Math.floor(Math.random() * 10);
    randomX = String.fromCharCode(97 + randomX);
    randomY = Math.floor(Math.random() * 10);
    const coordinates = randomX + randomY;
    return coordinates;
  }
};
