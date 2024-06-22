import { currentDay, updateoptionSelected } from './values';
import { GenerateTiles, GenerateRandomWaterTile } from './generation';
import { AgePlant } from './plants';
import { updateScore } from './utils';
document.addEventListener('DOMContentLoaded', () => {
    const plantButton = document.getElementById('plant');
    const harvestButton = document.getElementById('harvest');
    const waterButton = document.getElementById('water');
    const flattenButton = document.getElementById('flatten');
    const nextButton = document.getElementById('next');
    const day = document.getElementById('day');
    const message = document.getElementById('message');
    plantButton.addEventListener('click', () => {
        updateoptionSelected("planted");
    });
    waterButton.addEventListener('click', () => {
        updateoptionSelected("water");
    });
    flattenButton.addEventListener('click', () => {
        updateoptionSelected("flatten");
    });
    nextButton.addEventListener('click', () => {
        AgePlant();
        day.textContent = `you have ${currentDay} days`;
    });
    harvestButton.addEventListener('click', () => {
        updateoptionSelected("harvest");
    });
    GenerateTiles();
    GenerateRandomWaterTile();
    updateScore();
});
