import { isSupportedNode } from './index.js';

describe('isSupportedNode', () => {
  it('новая версия подходит', () => {
    expect(isSupportedNode('v24.1.0', 22), 'Версия 24 при минимуме 22').toBe(true);
  });

  it('старая версия не подходит', () => {
    expect(isSupportedNode('v8.17.0', 22), 'Версия 8 при минимуме 22').toBe(false);
  });

  it('пробел в начале не мешает', () => {
    expect(isSupportedNode('  v24.1.0', 22), 'Пробелы в начале').toBe(true);
  });

  it('ошибка терминала не подходит', () => {
    expect(isSupportedNode('bash: node: command not found', 22), 'Node.js не найден').toBe(false);
  });
});
