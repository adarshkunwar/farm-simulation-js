import { plant, harvest } from "./types";

let optionSelected: 'water' | 'planted' | 'flatten' | 'harvest' = "water";
let currentDay: number = 100;
const gridSize: number = 10;
const cells: HTMLElement[] = [];
let planted: plant[] = [];
let water: number[] = [];
let harvest: harvest[] = [{ seedType: 'wheat', quantity: 2 }];

function updatePlanted(array: plant[]) {
  planted = array;
}

function updatedWater(array: number[]) {
  water = array;
}

function updateoptionSelected(option: 'water' | 'planted' | 'flatten' | 'harvest') {
  optionSelected = option;
}

export { gridSize, cells, planted, water, optionSelected, currentDay, harvest, updatePlanted, updatedWater, updateoptionSelected }
