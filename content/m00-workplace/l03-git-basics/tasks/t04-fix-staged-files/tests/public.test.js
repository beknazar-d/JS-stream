import { stagedFiles } from './index.js';

describe('stagedFiles', () => {
  it('случай из тикета GIT-55', () => {
    const lines = [' M src/order.js', 'M  src/cart.js', 'A  src/utils.js', '?? notes.txt'];
    expect(stagedFiles(lines), 'Список файлов, которые войдут в коммит').toEqual(['src/cart.js', 'src/utils.js']);
  });

  it('пустой вывод', () => {
    expect(stagedFiles([]), 'Нет изменённых файлов').toEqual([]);
  });

  it('ничего не добавлено в индекс', () => {
    expect(stagedFiles([' M src/order.js', '?? notes.txt']), 'Всё вне индекса').toEqual([]);
  });
});
