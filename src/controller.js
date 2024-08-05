const Player = require("./player");
const Gameboard = require("./gameboard");

module.exports = class Controller {
  player_1;
  player_2;

  static init(player_1, player_2) {
    this.player_1 = new Player(player_1, new Gameboard());
    this.player_2 = new Player(player_2, new Gameboard());
  }

  static handleShipPlacement(playerName, coordinates, ship) {
    let currentPlayer = null;
    let currentShip = null;
    playerName === Controller.player_1.name
      ? (currentPlayer = Controller.player_1)
      : (currentPlayer = Controller.player_2);
    currentShip = currentPlayer.gameboard.fleet[ship];
    // currentPlayer.gameboard.placeShip(coordinates, currentShip);
    return currentPlayer.gameboard.placeShip(coordinates, currentShip);
  }

  static turnManager(player, state) {
    const DOM = require("./DOM.js");

    console.log("i am knocking the door");
    console.log(this.player_1.name === player && state === 1);
    if (this.player_1.name === player && state === 1) {
      DOM.prepTurnPage(this.player_2.name);
      return;
    }
    if (this.player_2.name === player && state === 1) {
      console.log(this.player_1, this.player_2);
      DOM.gameTurnPage();
    }
  }
};
