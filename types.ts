export type Plant = {
  cell: number;
  age: number;
};

export type Harvest = {
  seedType: 'wheat' | 'chocolate' | 'milk' | 'eggs';
  quantity: number;
};

export const gridSize: number = 10;

