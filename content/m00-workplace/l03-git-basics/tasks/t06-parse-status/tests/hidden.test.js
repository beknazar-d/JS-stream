import { parseStatus } from './index.js';

describe('parseStatus: краевые случаи', () => {
  it('пустой вывод: нечего коммитить', () => {
    expect(parseStatus(''), 'Пустая строка').toEqual({ staged: [], unstaged: [], untracked: [] });
    expect(parseStatus('\n'), 'Только перевод строки').toEqual({ staged: [], unstaged: [], untracked: [] });
  });

  it('вывод без перевода строки в конце', () => {
    expect(parseStatus('M  src/cart.js'), 'Одна строка без завершающего перевода').toEqual({
      staged: ['src/cart.js'],
      unstaged: [],
      untracked: [],
    });
  });

  it('только новые файлы', () => {
    expect(parseStatus('?? a.js\n?? b.js\n'), 'Два новых файла').toEqual({
      staged: [],
      unstaged: [],
      untracked: ['a.js', 'b.js'],
    });
  });

  it('новый файл, изменённый после добавления', () => {
    expect(parseStatus('AM src/new.js\n'), 'Код AM: добавлен и изменён').toEqual({
      staged: ['src/new.js'],
      unstaged: ['src/new.js'],
      untracked: [],
    });
  });

  it('переименование с изменением и имя с пробелом', () => {
    expect(parseStatus('RM old.js -> "new file.js"\n'), 'Код RM, новое имя в кавычках').toEqual({
      staged: ['new file.js'],
      unstaged: ['new file.js'],
      untracked: [],
    });
  });

  it('удаление в рабочей папке и в индексе', () => {
    expect(parseStatus(' D a.js\nD  b.js\n'), 'Два вида удаления').toEqual({
      staged: ['b.js'],
      unstaged: ['a.js'],
      untracked: [],
    });
  });
});
