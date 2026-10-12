import { output } from './answer.js';

describe('Формат и полнота ответа', () => {
  it('все элементы ответа — строки', () => {
    expect(output.every((item) => typeof item === 'string'), 'Каждая строка вывода записывается строкой').toBe(true);
  });

  it('ответ совпадает с выводом целиком', async () => {
    expect(output, 'Весь вывод кода, включая все таймеры').toEqual(await runSnippetAsync('snippet.js', 150));
  });
});
