import { parseCourier } from './index.js';

describe('parseCourier', () => {
  it('принимает верного курьера', () => {
    const result = parseCourier({ id: 7, name: 'Анна', phone: null });
    expect(result.ok).toBe(true);
  });

  // Допишите остальные случаи: какие значения должны быть отклонены?
});
