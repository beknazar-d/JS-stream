import { parseStatus } from './index.js';

const projectStatus = [
  ' D README.md',
  'D  docs/guide.md',
  ' M "price lists/may 2026.csv"',
  'M  src/cart.js',
  ' M src/order.js',
  'R  src/legacy.js -> src/orders-v2.js',
  'MM src/stock.js',
  'A  src/utils.js',
  '?? notes.txt',
  '?? reports/',
  '',
].join('\n');

describe('parseStatus: реальный вывод проекта', () => {
  it('staged: что войдёт в коммит', () => {
    expect(parseStatus(projectStatus).staged, 'Файлы в индексе').toEqual([
      'docs/guide.md',
      'src/cart.js',
      'src/orders-v2.js',
      'src/stock.js',
      'src/utils.js',
    ]);
  });

  it('unstaged: изменено, но не добавлено', () => {
    expect(parseStatus(projectStatus).unstaged, 'Изменения в рабочей папке').toEqual([
      'README.md',
      'price lists/may 2026.csv',
      'src/order.js',
      'src/stock.js',
    ]);
  });

  it('untracked: новые файлы и папки', () => {
    expect(parseStatus(projectStatus).untracked, 'Неотслеживаемые').toEqual(['notes.txt', 'reports/']);
  });
});
