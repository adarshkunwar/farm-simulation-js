import { Harvest } from './types.js';

export function updateScore(harvest: Harvest[]) {
  const score = document.getElementById('score');
  score.textContent = `wheat : ${harvest[0].quantity} \n`;
}

export function updateMessage(message: string) {
  const msg = document.getElementById('message');
  msg.textContent = message;
}
