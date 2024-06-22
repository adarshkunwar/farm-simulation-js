let optionSelected = "water";
let currentDay = 100;
const gridSize = 10;
const cells = [];
let planted = [];
let water = [];
let harvest = [{ seedType: 'wheat', quantity: 2 }];
function updatePlanted(array) {
    planted = array;
}
function updatedWater(array) {
    water = array;
}
function updateoptionSelected(option) {
    optionSelected = option;
}
export { gridSize, cells, planted, water, optionSelected, currentDay, harvest, updatePlanted, updatedWater, updateoptionSelected };
