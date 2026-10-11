import { fileOf } from './index.js';

describe('fileOf: краевые случаи', () => {
  it('имя с пробелом в кавычках', () => {
    expect(fileOf(' M "price lists/may 2026.csv"'), 'Имя в кавычках').toBe('price lists/may 2026.csv');
  });

  it('папка с косой чертой', () => {
    expect(fileOf('?? reports/'), 'Новая папка').toBe('reports/');
  });

  it('другие коды', () => {
    expect(fileOf('MM src/stock.js'), 'Код «MM»').toBe('src/stock.js');
    expect(fileOf('D  docs/guide.md'), 'Код «D »').toBe('docs/guide.md');
    expect(fileOf(' D README.md'), 'Код « D»').toBe('README.md');
  });
});
