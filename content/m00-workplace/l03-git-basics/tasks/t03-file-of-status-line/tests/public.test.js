import { fileOf } from './index.js';

describe('fileOf', () => {
  it('изменённый файл в рабочей папке', () => {
    expect(fileOf(' M src/order.js'), 'Код « M»').toBe('src/order.js');
  });

  it('файл в индексе', () => {
    expect(fileOf('M  src/cart.js'), 'Код «M »').toBe('src/cart.js');
    expect(fileOf('A  src/utils.js'), 'Код «A »').toBe('src/utils.js');
  });

  it('новый файл', () => {
    expect(fileOf('?? notes.txt'), 'Код «??»').toBe('notes.txt');
  });
});
