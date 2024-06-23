export function updateScore(harvest) {
    const score = document.getElementById('score');
    score.textContent = `wheat : ${harvest[0].quantity} \n`;
}
export function updateMessage(message) {
    const msg = document.getElementById('message');
    msg.textContent = message;
}
