interface Courier {
  id: number;
  name: string;
}

function isCourier(value: unknown): value is Courier {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string'
  );
}

const inputs: unknown[] = [{ id: 7, name: 'Анна' }, { id: '7', name: 'Анна' }, null, 'Анна'];

for (const input of inputs) {
  if (isCourier(input)) {
    console.log('курьер', input.name);
  } else {
    console.log('не курьер');
  }
}
