import { output } from './answer.js';

const expectedRun = runSnippetAsync('snippet.js', 120);

describe('Предсказание порядка вывода', () => {
  it('в ответе столько же строк, сколько выводит код', async () => {
    const expected = await expectedRun;
    expect(output, 'Ответ должен быть массивом').toBeInstanceOf(Array);
    expect(output, 'Количество строк в ответе').toHaveLength(expected.length);
  });

  [0, 1, 2, 3, 4, 5].forEach((index) => {
    it(`строка ${index + 1} совпадает с выводом`, async () => {
      const expected = await expectedRun;
      expect(output[index], `Строка ${index + 1} вывода`).toBe(expected[index]);
    });
  });
});
