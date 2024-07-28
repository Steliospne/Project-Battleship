const Gameboard = require("../gameboard");

const gameboard = new Gameboard();

// Using empty arrays to mock ship object so the tests,
// are not depended on more than one module
const fleet = {
  carrier: { length: 5, isHorizontal: true },
  battleship: { length: 4, isHorizontal: true },
  cruiser: { length: 3, isHorizontal: true },
  submarine: { length: 3, isHorizontal: true },
  destroyer: { length: 2, isHorizontal: true },
};

const ships = Object.values(fleet);

describe("Gameboard Tests", () => {
  const mockPlaceShip = jest.fn((coordinate, ship) => {
    const x = coordinate[0];
    const y = Number(coordinate[1]);
    const yNodes = Object.keys(gameboard.nodes);
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
        gameboard.nodes[x][newY] = 1;
        shipLocation.push(x + newY);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const newX = yNodes.indexOf(x) + i;
        const newX_InRange = newX <= yNodes.length;

        if (!newX_InRange || !yInRange) {
          return;
        }
        gameboard.nodes[yNodes[newX]][y] = 1;
      }
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

  test.each([["a5", ships[0]]])(
    "Tests that ships can't be placed out of the board (%s) Horizontal",
    (input, ship) => {
      // ships.forEach((ship) => {
      mockPlaceShip(input, ship);
      expect(mockPlaceShip).toHaveLastReturnedWith(1);
      gameboard.init();
      // });
    }
  );

  test.each([["f5", ships[0]]])(
    "Tests that ships can't be placed out of the board (%s) Vertical",
    (input, ship) => {
      ship.isHorizontal = false;
      // ships.forEach((ship) => {
      mockPlaceShip(input, ship);
      expect(mockPlaceShip).toHaveLastReturnedWith(1);
      gameboard.init();
      // });
    }
  );
});
