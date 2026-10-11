import { nodeMajor } from './index.js';

describe('nodeMajor', () => {
  it('достаёт мажорную версию из обычного вывода', () => {
    expect(nodeMajor('v22.22.0'), 'Вывод «v22.22.0»').toBe(22);
    expect(nodeMajor('v20.11.1'), 'Вывод «v20.11.1»').toBe(20);
  });

  it('возвращает число, а не строку', () => {
    expect(nodeMajor('v22.22.0'), 'Тип результата').toBeTypeOf('number');
  });
});
