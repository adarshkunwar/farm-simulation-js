import { gridSize, cells, water, optionSelected } from './values';
import { AddWater } from './water';
import { plantSeeds, harvestPlants } from './plants';
import { flattenTile } from './flatten';

const field = document.getElementById('field');

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
      if (optionSelected === "harvest") {
        harvestPlants(i)
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

export { GenerateTiles, GenerateRandomWaterTile }
