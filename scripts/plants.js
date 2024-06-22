import { planted, cells, harvest, updatePlanted } from "./values";
import { updateScore, CheckTilePosition, CheckAdjacentCells } from "./utils";
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
            updatePlanted(planted.filter(item => item.cell !== i));
            cells[i].classList.remove("planted");
            updateScore();
            break;
        default:
            break;
    }
}
export { AgePlant, plantSeeds, harvestPlants };
