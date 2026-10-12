import { parseCourier } from './index.js';

describe('parseCourier', () => {
  it('принимает верного курьера', () => {
    expect(parseCourier({ id: 7, name: 'Анна', phone: null }).ok).toBe(true);
  });

  it('отклоняет пустой объект', () => {
    expect(parseCourier({}).ok).toBe(false);
  });
});
