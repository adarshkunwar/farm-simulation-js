type plant = {
  cell: number;
  age: number;
}

type harvest = {
  seedType: 'wheat' | 'chocolate' | 'milk' | 'eggs';
  quantity: number
}

export { plant, harvest }
