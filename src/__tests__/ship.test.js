const Ship = require("../ship");

const fleet = {
  carrier: new Ship(5),
  battleship: new Ship(4),
  cruiser: new Ship(3),
  submarine: new Ship(3),
  destroyer: new Ship(2),
};

const ships = Object.values(fleet);

describe("Ship Object Tests", () => {
  test("Each ship should be sunk correctly based on hits", () => {
    // Check if each ship is sunk
    ships.forEach((ship) => {
      // Manually hit each ship the required number of times
      for (let i = 0; i < ship.length; i++) {
        ship.hit();
      }

      expect(ship.isSunk()).toBe(true);
      // Reset number of hits for the next test
      ship.hits = 0;
    });
  });

  test("No ship should be sunk if not hit", () => {
    // Check if each ship is not sunk
    ships.forEach((ship) => {
      expect(ship.isSunk()).toBe(false);
    });
  });

  test("Partial hits should not sink ships", () => {
    // Check if each ship is not sunk
    ships.forEach((ship) => {
      // Hit each ship one less than its length
      for (let i = 0; i < ship.length - 1; i++) {
        ship.hit();
      }

      expect(ship.isSunk()).toBe(false);
    });
  });
});
