import { resolvePath } from './index.js';

describe('resolvePath: упрощение пути', () => {
  it('точки внутри пути', () => {
    expect(resolvePath('/home/anna/shop/src', '../../..'), 'Три подъёма из src').toBe('/home');
    expect(resolvePath('/home/anna/shop', 'src/../docs/.'), 'Спуск, подъём и точка').toBe('/home/anna/shop/docs');
    expect(resolvePath('/home/anna/shop', '/home/anna/shop/src/../docs'), 'Абсолютный путь с двумя точками').toBe('/home/anna/shop/docs');
  });

  it('выше корня подняться нельзя', () => {
    expect(resolvePath('/home', '../../..'), 'Подъём выше корня').toBe('/');
    expect(resolvePath('/', '..'), 'cd .. в корне').toBe('/');
  });

  it('корень как текущая папка', () => {
    expect(resolvePath('/', 'src'), 'cd src из корня').toBe('/src');
    expect(resolvePath('/', '/'), 'cd / из корня').toBe('/');
  });

  it('лишние косые черты', () => {
    expect(resolvePath('/home/anna/', 'shop//src/'), 'Двойная косая черта и косая черта в конце').toBe('/home/anna/shop/src');
    expect(resolvePath('/home/anna/shop', ''), 'Пустой путь не меняет папку').toBe('/home/anna/shop');
  });

  it('имена с пробелами и точками', () => {
    expect(resolvePath('/home/anna/shop', 'price lists'), 'Папка с пробелом').toBe('/home/anna/shop/price lists');
    expect(resolvePath('/home/anna', '.config'), 'Скрытая папка').toBe('/home/anna/.config');
    expect(resolvePath('/home/anna', '...'), 'Три точки — обычное имя').toBe('/home/anna/...');
  });
});
