// Test function for CheckAdjacentCells
function testCheckAdjacentCells() {
  const field = document.createElement('div');
  const message = document.createElement('div');
  field.id = 'field';
  message.id = 'message';
  document.body.appendChild(field);
  document.body.appendChild(message);

  // Initialize grid and set up environment
  const gridSize = 10;
  const cells = [];
  let planted = [];
  let water = [];

  function CheckTilePosition(i) {
    if (planted.includes(i)) return "planted";
    if (water.includes(i)) return "water";
  }

  function CheckAdjacentCells(i) {
    const north = i < gridSize ? "wall" : CheckTilePosition(i - gridSize);
    const east = (i + 1) % gridSize === 0 ? "wall" : CheckTilePosition(i + 1);
    const south = i >= gridSize * (gridSize - 1) ? "wall" : CheckTilePosition(i + gridSize);
    const west = i % gridSize === 0 ? "wall" : CheckTilePosition(i - 1);
    return [north, east, south, west];
  }

  function setupTestGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      field.appendChild(cell);
      cells.push(cell);
    }
  }

  function plantSeeds(i) {
    cells[i].classList.add('planted');
    planted.push(i);
  }

  function addWater(i) {
    cells[i].classList.add('water');
    water.push(i);
  }

  setupTestGrid();

  // Simulate planting seeds and adding water
  plantSeeds(5);
  addWater(15);

  // Test the CheckAdjacentCells function
  console.log(CheckAdjacentCells(15)); // Should show statuses of cells around cell 15
  console.log(CheckAdjacentCells(5)); // Should show statuses of cells around cell 5

  // Clean up
  document.body.removeChild(field);
  document.body.removeChild(message);
}

// Run the test
testCheckAdjacentCells();
