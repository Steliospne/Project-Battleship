const Player = require("./player");
const Gameboard = require("./gameboard");
const NPC = require("./computer_player");

module.exports = class Controller {
  static player_1;
  static player_2;
  static turn = 0;

  static init(player_1, player_2) {
    this.player_1 = new Player(player_1, new Gameboard());
    if (player_2 === "computer") {
      this.player_2 = new NPC("computer", new Gameboard());
      return;
    }
    this.player_2 = new Player(player_2, new Gameboard());
  }

  static handleShipPlacement(playerName, coordinates, ship) {
    let currentPlayer = null;
    let currentShip = null;
    playerName === Controller.player_1.name
      ? (currentPlayer = Controller.player_1)
      : (currentPlayer = Controller.player_2);
    currentShip = currentPlayer.gameboard.fleet[ship];

    return currentPlayer.gameboard.placeShip(coordinates, currentShip);
  }

  static turnManager(player) {
    const DOM = require("./DOM.js");
    if (this.player_2.name !== "computer") {
      if (this.player_1.name === player && Controller.turn === 0) {
        DOM.prepTurnPage(this.player_2.name);
        Controller.turn++;
        return;
      }

      if (this.player_2.name === player && Controller.turn === 1) {
        Controller.turn = Controller.turn + 2;
        DOM.transitionPage(this.player_1);
        return;
      }

      if (Controller.turn % 2 === 0 && Controller.turn !== 0) {
        if (this.player_1.gameboard.isGameOver()) {
          DOM.gameOverPage(this.player_2);
          return;
        }
        DOM.transitionPage(this.player_1);
        Controller.turn++;
        return;
      }

      if (Controller.turn % 2 !== 0) {
        if (this.player_2.gameboard.isGameOver()) {
          DOM.gameOverPage(this.player_1);
          return;
        }
        DOM.transitionPage(this.player_2);
        Controller.turn++;
        return;
      }
    } else {
      DOM.gameStartPage(this.player_1);
      Controller.turn++;
      let result = false;
      while (!result) {
        result = this.player_1.gameboard.receiveAttack(this.player_2.play());
        console.log(result);
      }
      if (this.player_1.gameboard.isGameOver()) {
        DOM.gameOverPage(this.player_2);
        return;
      }

      if (this.player_2.gameboard.isGameOver()) {
        DOM.gameOverPage(this.player_1);
        return;
      }
      console.log("NPC plays", Controller.turn);
    }
  }
};
