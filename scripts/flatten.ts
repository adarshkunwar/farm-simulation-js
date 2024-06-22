import { CheckTilePosition, updateScore } from "./utils";
import { water, planted, cells, updatedWater, updatePlanted } from "./values";

function flattenTile(i: number) {
  let selectedTile = CheckTilePosition(i)
  switch (selectedTile) {
    case "water":
      updatedWater(water.filter(item => item !== i));
      cells[i].classList.remove("water")
      break;
    case "planted":
      let chosenPlant = planted.findIndex(item => item.cell === i)
      let age = planted[chosenPlant].age
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
      updatePlanted(planted.filter(item => item.cell !== i))
      cells[i].classList.remove("planted")
      updateScore()
      break;
    default:
      break;
  }
}

export { flattenTile }
