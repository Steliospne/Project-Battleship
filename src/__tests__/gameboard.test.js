const Gameboard = require("../gameboard");

const gameboard = new Gameboard();

// Using empty arrays to mock ship object so the tests,
// are not depended on more than one module
const fleet = {
  carrier: new Array(5),
  battleship: new Array(4),
  cruiser: new Array(3),
  submarine: new Array(3),
  destroyer: new Array(2),
};

const ships = Object.values(fleet);

describe("Gameboard Tests", () => {
  const mockPlaceShip = jest.fn((coordinate, ship) => {
    const nodeY = Object.keys(gameboard.nodes);
    const isInRangeX = nodeY.includes(coordinate[0]);
    const isInRangeY = +coordinate[1] < 0 || +coordinate[1] > 9;

    if (!(isInRangeX || isInRangeY)) {
      return;
    }
    return 1;
  });

  test.each(["a10", "x0", "k22"])(
    "Invalid coordinates (%s) should just return",
    (input) => {
      mockPlaceShip(input);

      expect(mockPlaceShip).toHaveReturned();
    }
  );

  test.each(["a3", "b6", "h8"])(
    "Valid coordinates (%s) should return with 1",
    (input) => {
      mockPlaceShip(input);
      expect(mockPlaceShip).toHaveLastReturnedWith(1);
    }
  );
});
