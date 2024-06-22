import { CheckTilePosition, CheckAdjacentCells, updateScore } from "./utils";
import { cells, water } from "./values";
function AddWater(i) {
    if (CheckTilePosition(i) === "empty") {
        if (CheckAdjacentCells(i).includes("water")) {
            cells[i].classList.add('water');
            water.push(i);
        }
    }
    updateScore();
}
export { AddWater };
