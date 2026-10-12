import { output } from './answer.js';

describe('Формат ответа', () => {
  it('в ответе шесть строк', () => {
    expect(output, 'Ответ должен быть массивом').toBeInstanceOf(Array);
    expect(output, 'Количество строк в ответе').toHaveLength(6);
    expect(output.every((item) => typeof item === 'string'), 'Каждая строка вывода записывается строкой: "0", а не 0').toBe(true);
  });

  it('третья строка — результат плюса со строкой', () => {
    expect(output[2], "'3' + 1 — склейка строк").toBe('31');
  });
});
