document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const plantButton = document.getElementById('plant');
  const harvestButton = document.getElementById('harvest');
  const waterButton = document.getElementById('water');
  const flattenButton = document.getElementById('flatten');
  const nextButton = document.getElementById('next');
  const day = document.getElementById('day');
  const message = document.getElementById('message');

  type plant = {
    cell: number;
    age: number;
  }

  let optionSelected: 'water' | 'planted' | 'flatten' = "water";
  let currentDay: number = 100;
  const gridSize: number = 10;
  const cells: HTMLElement[] = [];
  let planted: plant[] = [];
  let water: number[] = [];

  function CheckTilePosition(i: number): string {
    if (planted.some(plant => plant.cell === i)) return "planted"
    if (water.includes(i)) return "water"
    else return "empty"
  }

  function CheckAdjacentCells(i: number) {
    let north: string = (i < gridSize) ? "wall" : CheckTilePosition(i - gridSize);
    let east: string = ((i + 1) % gridSize) === 0 ? "wall" : CheckTilePosition(i + 1);
    let south = (i + gridSize) > gridSize * gridSize ? "wall" : CheckTilePosition(i + gridSize);
    let west = (i) % gridSize === 0 ? "wall" : CheckTilePosition(i - 1);
    return [north, east, south, west];
  }

  function AddWater(i: number) {
    if (CheckTilePosition(i) === "empty") {
      if (CheckAdjacentCells(i).includes("water")) {
        cells[i].classList.add('water');
        water.push(i)
      }
    }
  }

  function plantSeeds(i: number) {
    if (CheckTilePosition(i) === "empty") {
      if (CheckAdjacentCells(i).includes("water")) {
        cells[i].classList.add('planted');
        planted.push({ cell: i, age: 1 })
      }
    }
  }

  function flattenTile(i: number) {
    let selectedTile = CheckTilePosition(i)
    switch (selectedTile) {
      case "water":
        water = water.filter(item => item !== i);
        cells[i].classList.remove("water")
        break;
      case "planted":
        planted = planted.filter(item => item.cell !== i);
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
        if (optionSelected === "planted") {
          plantSeeds(i);
        }
        if (optionSelected === "water") {
          AddWater(i);
        }
        if (optionSelected === "flatten") {
          flattenTile(i)
        }
      });
      field!.appendChild(cell);
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

  plantButton!.addEventListener('click', () => {
    optionSelected = "planted";
  });

  waterButton!.addEventListener('click', () => {
    optionSelected = "water";
  });

  flattenButton!.addEventListener('click', () => {
    optionSelected = "flatten";
  });

  nextButton?.addEventListener('click', () => {
    currentDay--;
    day!.textContent = `you have ${currentDay} days`
  })

  harvestButton!.addEventListener('click', () => {
    cells.forEach(cell => {
      if (cell.classList.contains('planted')) {
        cell.classList.remove('planted');
        cell.classList.add('harvested');
        message!.textContent = 'You harvested the crops!';
      }
    });
  });

  GenerateTiles();
  GenerateRandomWaterTile();
});

