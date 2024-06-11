document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const plantButton = document.getElementById('plant');
  const harvestButton = document.getElementById('harvest');
  const message = document.getElementById('message');

  const gridSize = 10;
  const cells = [];
  let water = [];


  function GenerateRandomWaterTile() {
    water = [];
    let randomTile = Math.floor(Math.random() * gridSize * gridSize);
    if (water.includes(randomTile)) {
      GenerateRandomWaterTile();
    }
    else {
      water.push(randomTile);
    }
  }

  function colorWaterTiles() {
    for (let i = 0; i < water.length; i++) {
      cells[water[i]].classList.add('water');
    }
  }

  // Initialize field with cells
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => {
      if (cell.classList.contains('planted')) {
        cell.classList.remove('planted');
        cell.classList.add('harvested');
        message.textContent = 'You harvested the crops!';
      } else {
        cell.classList.add('planted');
        message.textContent = 'You planted seeds!';
      }
    });
    field.appendChild(cell);
    cells.push(cell);
  }

  plantButton.addEventListener('click', () => {
    cells.forEach(cell => {
      if (!cell.classList.contains('planted')) {
        cell.classList.add('planted');
        message.textContent = 'You planted seeds!';
      }
    });
  });

  harvestButton.addEventListener('click', () => {
    cells.forEach(cell => {
      if (cell.classList.contains('planted')) {
        cell.classList.remove('planted');
        cell.classList.add('harvested');
        message.textContent = 'You harvested the crops!';
      }
    });
  });
  GenerateRandomWaterTile();
  colorWaterTiles();
});

