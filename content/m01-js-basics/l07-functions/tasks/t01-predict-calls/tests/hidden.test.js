import { output } from './answer.js';

describe('Формат ответа', () => {
  it('все элементы ответа — строки', () => {
    expect(output.every((item) => typeof item === 'string'), 'Каждая строка вывода записывается строкой: "560", а не 560').toBe(true);
  });

  it('ответ совпадает с выводом целиком', () => {
    expect(output, 'Весь вывод кода').toEqual(runSnippet('snippet.js'));
  });
});
