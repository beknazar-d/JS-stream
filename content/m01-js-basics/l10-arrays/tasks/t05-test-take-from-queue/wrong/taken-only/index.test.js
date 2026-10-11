import { takeFromQueue } from './index.js';

describe('takeFromQueue', () => {
  it('берёт первые заказы', () => {
    expect(takeFromQueue(['A-1', 'A-2', 'A-3'], 2).taken, 'Два заказа').toEqual(['A-1', 'A-2']);
  });

  it('берёт всё, если запросили больше', () => {
    expect(takeFromQueue(['A-1'], 5).taken, 'Больше, чем есть').toEqual(['A-1']);
  });
});
