import { isSupportedNode } from './index.js';

describe('isSupportedNode: обычные случаи', () => {
  it('новая версия подходит', () => {
    expect(isSupportedNode('v24.1.0', 22), 'Версия 24 при минимуме 22').toBe(true);
  });

  it('старая версия не подходит', () => {
    expect(isSupportedNode('v18.19.0', 22), 'Версия 18 при минимуме 22').toBe(false);
  });
});

describe('isSupportedNode: границы', () => {
  it('версия ровно равная минимуму подходит', () => {
    expect(isSupportedNode('v22.22.0', 22), 'Версия 22 при минимуме 22').toBe(true);
  });

  it('версия на единицу меньше минимума не подходит', () => {
    expect(isSupportedNode('v21.7.3', 22), 'Версия 21 при минимуме 22').toBe(false);
  });

  it('однозначная версия не путается с двузначной', () => {
    expect(isSupportedNode('v8.17.0', 22), 'Версия 8 при минимуме 22').toBe(false);
    expect(isSupportedNode('v9.11.2', 10), 'Версия 9 при минимуме 10').toBe(false);
  });
});

describe('isSupportedNode: вывод терминала', () => {
  it('пробелы и перевод строки по краям не мешают', () => {
    expect(isSupportedNode('v22.22.0\n', 22), 'Перевод строки в конце').toBe(true);
    expect(isSupportedNode('  v22.22.0', 22), 'Пробелы в начале').toBe(true);
  });

  it('текст ошибки вместо версии не подходит', () => {
    expect(isSupportedNode('bash: node: command not found', 22), 'Node.js не найден').toBe(false);
  });

  it('пустой вывод не подходит', () => {
    expect(isSupportedNode('', 22), 'Пустая строка').toBe(false);
  });
});
