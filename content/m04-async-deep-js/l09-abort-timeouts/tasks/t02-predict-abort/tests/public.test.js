import { output } from './answer.js';

describe('Предсказание вывода', () => {
  it('в ответе столько же строк, сколько выводит код', async () => {
    const expected = await runSnippetAsync('snippet.js');
    expect(output, 'Ответ должен быть массивом').toBeInstanceOf(Array);
    expect(output, 'Количество строк в ответе').toHaveLength(expected.length);
  });

  it('строки совпадают с выводом', async () => {
    const expected = await runSnippetAsync('snippet.js');
    expected.forEach((line, index) => {
      expect(output[index], `Строка ${index + 1} вывода. Пишите значение как строку, например "false"`).toBe(line);
    });
  });
});
