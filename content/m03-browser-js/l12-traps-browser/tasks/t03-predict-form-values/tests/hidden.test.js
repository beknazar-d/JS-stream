import { output } from './answer.js';

const expected = runSnippet('snippet.js');

describe('Предсказание вывода', () => {
  it('в ответе столько же строк, сколько выводит код', () => {
    expect(output, 'Количество строк').toHaveLength(expected.length);
  });

  expected.forEach((line, index) => {
    it(`строка ${index + 1} совпадает с выводом`, () => {
      expect(output[index], `Строка ${index + 1} вывода`).toBe(line);
    });
  });
});
