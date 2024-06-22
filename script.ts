import { Plant, Harvest, gridSize } from './types.js';
import { CheckTilePosition, CheckAdjacentCells, AgePlant, AddWater, plantSeeds, harvestPlants, flattenTile, GenerateRandomWaterTile } from './gameLogic.js';
import { updateScore } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const score = document.getElementById('score');
  const field = document.getElementById('field');
  const plantButton = document.getElementById('plant');
  const harvestButton = document.getElementById('harvest');
  const waterButton = document.getElementById('water');
  const flattenButton = document.getElementById('flatten');
  const nextButton = document.getElementById('next');
  const day = document.getElementById('day');
  const message = document.getElementById('message');

  let optionSelected: 'water' | 'planted' | 'flatten' | 'harvest' = "water";
  let currentDay: number = 100;
  const cells: HTMLElement[] = [];

  function GenerateTiles() {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => {
        if (optionSelected === "planted") {
          plantSeeds(i, cells);
        }
        if (optionSelected === "water") {
          AddWater(i, cells);
        }
        if (optionSelected === "flatten") {
          flattenTile(i, cells);
        }
        if (optionSelected === "harvest") {
          harvestPlants(i, cells);
        }
      });
      field.appendChild(cell);
      cells.push(cell);
    }
  }

  plantButton.addEventListener('click', () => {
    optionSelected = "planted";
  });

  waterButton.addEventListener('click', () => {
    optionSelected = "water";
  });

  flattenButton.addEventListener('click', () => {
    optionSelected = "flatten";
  });

  nextButton.addEventListener('click', () => {
    currentDay--;
    AgePlant(cells);
    day.textContent = `you have ${currentDay} days`;
  });

  harvestButton.addEventListener('click', () => {
    optionSelected = "harvest";
  });

  GenerateTiles();
  GenerateRandomWaterTile(cells);
  updateScore([{ seedType: 'wheat', quantity: 2 }]);
});
