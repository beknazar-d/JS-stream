import { lastPart } from './index.js';

describe('lastPart', () => {
  it('путь macOS и Linux', () => {
    expect(lastPart('/home/anna/shop/src/index.js'), 'Путь к файлу').toBe('index.js');
    expect(lastPart('/home/anna/shop'), 'Путь к папке').toBe('shop');
  });

  it('относительный путь', () => {
    expect(lastPart('src/orders.js'), 'Относительный путь к файлу').toBe('orders.js');
    expect(lastPart('src'), 'Путь из одной части').toBe('src');
  });

  it('путь Windows', () => {
    expect(lastPart('C:\\Users\\anna\\shop'), 'Путь Windows к папке').toBe('shop');
    expect(lastPart('C:\\Users\\anna\\shop\\src\\index.js'), 'Путь Windows к файлу').toBe('index.js');
  });
});
