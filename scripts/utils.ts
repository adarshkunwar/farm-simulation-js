import { gridSize, harvest, planted, water } from "./values";
const score = document.getElementById('score');

function updateScore() {
  score.textContent = `wheat : ${harvest[0].quantity} \n`
}

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

export { updateScore, CheckTilePosition, CheckAdjacentCells };
