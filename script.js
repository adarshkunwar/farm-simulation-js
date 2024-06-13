document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const plantButton = document.getElementById('plant');
  const harvestButton = document.getElementById('harvest');
  const waterButton = document.getElementById('water');
  const flattenButton = document.getElementById('flatten');
  const nextButton = document.getElementById('next');
  const day = document.getElementById('day');
  const message = document.getElementById('message');

  let optionSelected = "water";
  let currentDay = 100;
  const gridSize = 10;
  const cells = [];
  let planted = [];
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

  function flattenTile(i) {
    let selectedTile = CheckTilePosition(i)
    switch (selectedTile) {
      case "water":
        water = water.filter(item => item !== i);
        cells[i].classList.remove("water")
        break;
      case "planted":
        planted = planted.filter(item => item !== i);
        cells[i].classList.remove("planted")
        break;
      default:
        break;
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
        if (optionSelected === "flatten") {
          flattenTile(i)
        }
      });
      field.appendChild(cell);
      cells.push(cell);
    }
  }

  function GenerateRandomWaterTile() {
    let randomTile = Math.floor(Math.random() * gridSize * gridSize);
    water.push(randomTile);
    for (let i = 0; i < water.length; i++) {
      cells[water[i]].classList.add('water');
    }
  }

  plantButton.addEventListener('click', () => {
    optionSelected = "plant";
  });

  waterButton.addEventListener('click', () => {
    optionSelected = "water";
  });

  flattenButton.addEventListener('click', () => {
    optionSelected = "flatten";
  });

  nextButton.addEventListener('click', () => {
    currentDay--;
    day.textContent = `you have ${currentDay} days`
  })

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
});

