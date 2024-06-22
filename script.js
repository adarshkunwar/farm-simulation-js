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
    let optionSelected = "water";
    let currentDay = 100;
    const gridSize = 10;
    const cells = [];
    let planted = [];
    let water = [];
    let harvest = [{ seedType: 'wheat', quantity: 2 }];
    function updateScore() {
        score.textContent = `wheat : ${harvest[0].quantity} \n`;
    }
    function CheckTilePosition(i) {
        if (planted.some(plant => plant.cell === i))
            return "planted";
        if (water.includes(i))
            return "water";
        else
            return "empty";
    }
    function CheckAdjacentCells(i) {
        let north = (i < gridSize) ? "wall" : CheckTilePosition(i - gridSize);
        let east = ((i + 1) % gridSize) === 0 ? "wall" : CheckTilePosition(i + 1);
        let south = (i + gridSize) > gridSize * gridSize ? "wall" : CheckTilePosition(i + gridSize);
        let west = (i) % gridSize === 0 ? "wall" : CheckTilePosition(i - 1);
        return [north, east, south, west];
    }
    function AgePlant() {
        for (let i = 0; i < planted.length; i++) {
            planted[i].age = planted[i].age + 1;
            switch (planted[i].age) {
                case 1:
                    break;
                case 2:
                    cells[planted[i].cell].classList.remove('wheat01');
                    cells[planted[i].cell].classList.add('wheat02');
                    break;
                case 3:
                    cells[planted[i].cell].classList.remove('wheat02');
                    cells[planted[i].cell].classList.add('wheat03');
                    break;
                default:
                    break;
            }
        }
    }
    function AddWater(i) {
        if (CheckTilePosition(i) === "empty") {
            if (CheckAdjacentCells(i).includes("water")) {
                cells[i].classList.add('water');
                water.push(i);
            }
        }
        updateScore();
    }
    function plantSeeds(i) {
        if (CheckTilePosition(i) === "empty") {
            if (CheckAdjacentCells(i).includes("water")) {
                if (harvest[0].quantity > 0) {
                    cells[i].classList.add('planted');
                    cells[i].classList.add('wheat01');
                    planted.push({ cell: i, age: 1 });
                    harvest[0].quantity = harvest[0].quantity - 1;
                }
            }
        }
        updateScore();
    }
    function harvestPlants(i) {
        let selectedTile = CheckTilePosition(i);
        switch (selectedTile) {
            case "water":
                break;
            case "planted":
                let chosenPlant = planted.findIndex(item => item.cell === i);
                let age = planted[chosenPlant].age;
                switch (age) {
                    case 1:
                        cells[i].classList.remove("wheat01");
                        break;
                    case 2:
                        cells[i].classList.remove("wheat02");
                        break;
                    case 3:
                        cells[i].classList.remove("wheat03");
                        harvest[0].quantity = harvest[0].quantity + 2;
                        break;
                    default:
                        cells[i].classList.remove("wheat03");
                        harvest[0].quantity = harvest[0].quantity + 2;
                        break;
                }
                planted = planted.filter(item => item.cell !== i);
                cells[i].classList.remove("planted");
                updateScore();
                break;
            default:
                break;
        }
    }
    function flattenTile(i) {
        let selectedTile = CheckTilePosition(i);
        switch (selectedTile) {
            case "water":
                water = water.filter(item => item !== i);
                cells[i].classList.remove("water");
                break;
            case "planted":
                let chosenPlant = planted.findIndex(item => item.cell === i);
                let age = planted[chosenPlant].age;
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
                planted = planted.filter(item => item.cell !== i);
                cells[i].classList.remove("planted");
                updateScore();
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
                    flattenTile(i);
                }
                if (optionSelected === "harvest") {
                    harvestPlants(i);
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
        AgePlant();
        day.textContent = `you have ${currentDay} days`;
    });
    harvestButton.addEventListener('click', () => {
        optionSelected = "harvest";
    });
    GenerateTiles();
    GenerateRandomWaterTile();
    updateScore();
});
