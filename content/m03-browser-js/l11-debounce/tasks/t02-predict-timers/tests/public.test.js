import { output } from './answer.js';

describe('Формат ответа', () => {
  it('ответ — массив из семи строк', () => {
    expect(output, 'Ответ должен быть массивом').toBeInstanceOf(Array);
    expect(output, 'Количество строк в ответе: считайте и обычный код, и таймеры').toHaveLength(7);
    expect(output.every((item) => typeof item === 'string'), 'Каждая строка вывода записывается строкой').toBe(true);
  });

  it('первые две строки — обычный код до таймеров', () => {
    expect(output.slice(0, 2), 'Сначала выполняются вызовы onInput, они выводят «ввод»').toEqual(['ввод: ч', 'ввод: чай']);
  });
});
