import { resolvePath } from './index.js';

describe('resolvePath', () => {
  it('вложенная папка', () => {
    expect(resolvePath('/home/anna/shop', 'src'), 'cd src из /home/anna/shop').toBe('/home/anna/shop/src');
    expect(resolvePath('/home/anna', 'shop/src'), 'cd shop/src из /home/anna').toBe('/home/anna/shop/src');
  });

  it('две точки поднимают на уровень выше', () => {
    expect(resolvePath('/home/anna/shop/src', '..'), 'cd .. из src').toBe('/home/anna/shop');
    expect(resolvePath('/home/anna/shop/src', '../docs'), 'cd ../docs из src').toBe('/home/anna/shop/docs');
  });

  it('одна точка не меняет папку', () => {
    expect(resolvePath('/home/anna/shop', '.'), 'cd . из shop').toBe('/home/anna/shop');
    expect(resolvePath('/home/anna/shop', './src'), 'cd ./src из shop').toBe('/home/anna/shop/src');
  });

  it('абсолютный путь заменяет текущую папку', () => {
    expect(resolvePath('/home/anna/shop', '/tmp'), 'cd /tmp').toBe('/tmp');
  });
});
