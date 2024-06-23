import { gridSize } from './types.js';
import { updateScore, updateMessage } from './ui.js';
let plantedCells = [];
let waterCells = [];
let harvestCells = [{ seedType: 'wheat', quantity: 2 }];
let costOfWater = 5;
let costOfSeed = 1;
export function CheckTilePosition(i) {
    if (plantedCells.some(plant => plant.cell === i))
        return "planted";
    if (waterCells.includes(i))
        return "water";
    else
        return "empty";
}
export function CheckAdjacentCells(i) {
    let north = (i < gridSize) ? "wall" : CheckTilePosition(i - gridSize);
    let east = ((i + 1) % gridSize) === 0 ? "wall" : CheckTilePosition(i + 1);
    let south = (i + gridSize) >= gridSize * gridSize ? "wall" : CheckTilePosition(i + gridSize);
    let west = (i) % gridSize === 0 ? "wall" : CheckTilePosition(i - 1);
    return [north, east, south, west];
}
export function AgePlant(cells) {
    for (let i = 0; i < plantedCells.length; i++) {
        plantedCells[i].age = plantedCells[i].age + 1;
        switch (plantedCells[i].age) {
            case 1:
                break;
            case 2:
                cells[plantedCells[i].cell].classList.remove('wheat01');
                cells[plantedCells[i].cell].classList.add('wheat02');
                break;
            case 3:
                cells[plantedCells[i].cell].classList.remove('wheat02');
                cells[plantedCells[i].cell].classList.add('wheat03');
                break;
            default:
                break;
        }
    }
}
export function AddWater(i, cells) {
    console.log("Tried to add water");
    if (CheckTilePosition(i) === "empty") {
        if (CheckAdjacentCells(i).includes("water")) {
            if (harvestCells[0].quantity >= costOfWater) {
                cells[i].classList.add('water');
                waterCells.push(i);
                harvestCells[0].quantity = harvestCells[0].quantity - costOfWater;
            }
            else {
                updateMessage(`You need ${costOfWater} wheat to add water.`);
            }
        }
    }
    updateScore(harvestCells);
}
export function plantSeeds(i, cells) {
    if (CheckTilePosition(i) === "empty") {
        if (CheckAdjacentCells(i).includes("water")) {
            if (harvestCells[0].quantity >= costOfSeed) {
                cells[i].classList.add('planted');
                cells[i].classList.add('wheat01');
                plantedCells.push({ cell: i, age: 1 });
                harvestCells[0].quantity = harvestCells[0].quantity - costOfSeed;
            }
            else {
                updateMessage(`You need ${costOfSeed} wheat to plant trees.`);
            }
        }
    }
    updateScore(harvestCells);
}
export function harvestPlants(i, cells) {
    let selectedTile = CheckTilePosition(i);
    switch (selectedTile) {
        case "water":
            break;
        case "planted":
            let chosenPlant = plantedCells.findIndex(item => item.cell === i);
            let age = plantedCells[chosenPlant].age;
            switch (age) {
                case 1:
                    cells[i].classList.remove("wheat01");
                    break;
                case 2:
                    cells[i].classList.remove("wheat02");
                    break;
                case 3:
                    cells[i].classList.remove("wheat03");
                    harvestCells[0].quantity = harvestCells[0].quantity + 2;
                    break;
                default:
                    cells[i].classList.remove("wheat03");
                    harvestCells[0].quantity = harvestCells[0].quantity + 2;
                    break;
            }
            plantedCells = plantedCells.filter(item => item.cell !== i);
            cells[i].classList.remove("planted");
            updateScore(harvestCells);
            break;
        default:
            break;
    }
}
export function flattenTile(i, cells) {
    let selectedTile = CheckTilePosition(i);
    switch (selectedTile) {
        case "water":
            waterCells = waterCells.filter(item => item !== i);
            cells[i].classList.remove("water");
            break;
        case "planted":
            let chosenPlant = plantedCells.findIndex(item => item.cell === i);
            let age = plantedCells[chosenPlant].age;
            switch (age) {
                case 1:
                    cells[i].classList.remove("wheat01");
                    break;
                case 2:
                    cells[i].classList.remove("wheat02");
                    break;
                case 3:
                    cells[i].classList.remove("wheat03");
                    break;
                default:
                    cells[i].classList.remove("wheat03");
                    break;
            }
            plantedCells = plantedCells.filter(item => item.cell !== i);
            cells[i].classList.remove("planted");
            updateScore(harvestCells);
            break;
        default:
            break;
    }
}
export function GenerateRandomWaterTile(cells) {
    let randomTile = Math.floor(Math.random() * gridSize * gridSize);
    waterCells.push(randomTile);
    for (let i = 0; i < waterCells.length; i++) {
        cells[waterCells[i]].classList.add('water');
    }
}
