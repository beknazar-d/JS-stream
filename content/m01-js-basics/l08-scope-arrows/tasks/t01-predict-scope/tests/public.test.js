import { output } from './answer.js';

const expected = runSnippet('snippet.js');

describe('Предсказание вывода', () => {
  it('в ответе столько же строк, сколько выводит код', () => {
    expect(output, 'Ответ должен быть массивом').toBeInstanceOf(Array);
    expect(output, 'Количество строк в ответе').toHaveLength(expected.length);
  });

  expected.forEach((line, index) => {
    it(`строка ${index + 1} совпадает с выводом`, () => {
      expect(output[index], `Строка ${index + 1} вывода. Пишите значение как строку, например "750"`).toBe(line);
    });
  });
});
