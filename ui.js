export function updateScore(harvest) {
    const score = document.getElementById('score');
    score.textContent = `wheat : ${harvest[0].quantity} \n`;
}
