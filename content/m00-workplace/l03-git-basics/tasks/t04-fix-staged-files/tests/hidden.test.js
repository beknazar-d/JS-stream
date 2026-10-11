import { stagedFiles } from './index.js';

describe('stagedFiles: разные коды', () => {
  it('файл с кодом MM входит в коммит', () => {
    expect(stagedFiles(['MM src/stock.js']), 'MM: часть изменений в индексе').toEqual(['src/stock.js']);
  });

  it('удалённые файлы из индекса', () => {
    expect(stagedFiles(['D  docs/guide.md', ' D README.md']), 'D  в индексе, « D» нет').toEqual(['docs/guide.md']);
  });

  it('порядок сохраняется', () => {
    const lines = ['M  b.js', 'A  a.js', 'D  c.js'];
    expect(stagedFiles(lines), 'Порядок как в выводе').toEqual(['b.js', 'a.js', 'c.js']);
  });

  it('весь реальный вывод проекта', () => {
    const lines = [
      ' D README.md',
      'D  docs/guide.md',
      ' M price/list.csv',
      'M  src/cart.js',
      ' M src/order.js',
      'MM src/stock.js',
      'A  src/utils.js',
      '?? notes.txt',
      '?? reports/',
    ];
    expect(stagedFiles(lines), 'Файлы в индексе в большом выводе').toEqual(['docs/guide.md', 'src/cart.js', 'src/stock.js', 'src/utils.js']);
  });
});
