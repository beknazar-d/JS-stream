import { output } from './answer.js';

describe('Формат ответа', () => {
  it('все элементы ответа — строки', () => {
    expect(output.every((line) => typeof line === 'string'), 'Каждая строка ответа должна быть строкой').toBe(true);
  });
});
