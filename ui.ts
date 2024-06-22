import { Harvest } from './types.js';

export function updateScore(harvest: Harvest[]) {
  const score = document.getElementById('score');
  score.textContent = `wheat : ${harvest[0].quantity} \n`;
}
