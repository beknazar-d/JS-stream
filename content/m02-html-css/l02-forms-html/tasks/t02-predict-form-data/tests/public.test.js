import { output } from './answer.js';

describe('Формат ответа', () => {
  it('все элементы ответа — строки', () => {
    expect(output.every((item) => typeof item === 'string'), 'Каждая строка вывода записывается строкой: "31", а не 31').toBe(true);
  });

  it('ответ совпадает с выводом целиком', () => {
    expect(output, 'Весь вывод кода').toEqual(runSnippet('snippet.js'));
  });
});
