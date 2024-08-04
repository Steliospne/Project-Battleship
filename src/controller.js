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
};
