const Ship = require("../ship");

describe("Ship Object Tests", () => {
  test("Each ship should be sunk correctly based on hits", () => {
    const fleet = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };

    // Manually hit each ship the required number of times
    const ships = Object.values(fleet);

    ships.forEach((ship) => {
      for (let i = 0; i < ship.length; i++) {
        ship.hit();
      }
    });

    // Check if each ship is sunk
    ships.forEach((ship) => {
      expect(ship.isSunk()).toBe(true);
    });
  });

  test("No ship should be sunk if not hit", () => {
    const fleet = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };

    const ships = Object.values(fleet);

    // Check if each ship is not sunk
    ships.forEach((ship) => {
      expect(ship.isSunk()).toBe(false);
    });
  });

  test("Partial hits should not sink ships", () => {
    const fleet = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };

    // Hit each ship one less than its length
    fleet.carrier.hit();
    fleet.carrier.hit();
    fleet.carrier.hit();
    fleet.carrier.hit();

    fleet.battleship.hit();
    fleet.battleship.hit();
    fleet.battleship.hit();

    fleet.cruiser.hit();
    fleet.cruiser.hit();

    fleet.submarine.hit();
    fleet.submarine.hit();

    fleet.destroyer.hit();

    const ships = Object.values(fleet);

    // Check if each ship is not sunk
    ships.forEach((ship) => {
      expect(ship.isSunk()).toBe(false);
    });
  });
});
