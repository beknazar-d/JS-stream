import { isSupportedNode } from './index.js';

describe('isSupportedNode', () => {
  it('новая версия подходит', () => {
    expect(isSupportedNode('v24.1.0', 22), 'Версия 24 при минимуме 22').toBe(true);
  });

  it('старая версия не подходит', () => {
    expect(isSupportedNode('v18.19.0', 22), 'Версия 18 при минимуме 22').toBe(false);
  });
});
