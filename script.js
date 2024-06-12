document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const plantButton = document.getElementById('plant');
  const harvestButton = document.getElementById('harvest');
  const waterbutton = document.getElementById('water');
  const message = document.getElementById('message');

  let optionSelected = "water";

  const gridSize = 10;
  const cells = [];
  const planted = [];
  let water = [];

  function CheckTilePosition(i) {
    if (planted.includes(i)) return "planted"
    if (water.includes(i)) return "water"
    else return "empty"
  }

  function CheckAdjacentCells(i) {
    north = (i < gridSize) ? "wall" : CheckTilePosition(i - gridSize);
    east = (i + 1) % gridSize === 0 ? "wall" : CheckTilePosition(i + 1);
    south = (i + gridSize) > gridSize * gridSize ? "wall" : CheckTilePosition(i + gridSize);
    west = (i) % gridSize === 0 ? "wall" : CheckTilePosition(i - 1);
    return [north, east, south, west];
  }

  function AddWater(i) {
    if (CheckTilePosition(i) === "empty") {
      if (CheckAdjacentCells(i).includes("water")) {
        cells[i].classList.add('water');
        water.push(i)
      }
    }
  }

  function plantSeeds(i) {
    if (CheckTilePosition(i) === "empty") {
      if (CheckAdjacentCells(i).includes("water")) {
        cells[i].classList.add('planted');
        planted.push(i)
      }
    }
  }

  function GenerateTiles() {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => {
        if (optionSelected === "plant") {
          plantSeeds(i);
        }
        if (optionSelected === "water") {
          AddWater(i);
        }
      });
      field.appendChild(cell);
      cells.push(cell);
    }
  }

  function GenerateRandomWaterTile() {
    water = [];
    let randomTile = Math.floor(Math.random() * gridSize * gridSize);
    if (water.includes(randomTile)) {
      GenerateRandomWaterTile();
    }
    else {
      water.push(randomTile);
    }
  }

  function colorWaterTiles() {
    for (let i = 0; i < water.length; i++) {
      cells[water[i]].classList.add('water');
    }
  }

  plantButton.addEventListener('click', () => {
    optionSelected = "plant";
  });

  waterbutton.addEventListener('click', () => {
    optionSelected = "water";
  });

  harvestButton.addEventListener('click', () => {
    cells.forEach(cell => {
      if (cell.classList.contains('planted')) {
        cell.classList.remove('planted');
        cell.classList.add('harvested');
        message.textContent = 'You harvested the crops!';
      }
    });
  });

  GenerateTiles();
  GenerateRandomWaterTile();
  colorWaterTiles();
});

