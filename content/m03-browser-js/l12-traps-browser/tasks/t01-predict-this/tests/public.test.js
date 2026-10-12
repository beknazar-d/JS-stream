import { output } from './answer.js';

describe('Формат ответа', () => {
  it('в ответе шесть строк', () => {
    expect(output, 'Ответ должен быть массивом').toBeInstanceOf(Array);
    expect(output, 'Количество строк в ответе').toHaveLength(6);
    expect(output.every((item) => typeof item === 'string'), 'Каждая строка вывода записывается строкой').toBe(true);
  });

  it('первая строка — название товара из this обычной функции', () => {
    expect(output[0], 'plain.call(product) возвращает this.title, где this — product').toBe('Чайник');
  });
});
