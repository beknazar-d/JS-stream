import { findErrorLocation } from './index.js';

describe('findErrorLocation: другие форматы', () => {
  it('ES-модули: путь с file:///', () => {
    const stack = `TypeError: Cannot read properties of undefined (reading 'replace')
    at parseWeight (file:///home/anna/shop/src/delivery.js:2:22)
    at shippingCost (file:///home/anna/shop/src/delivery.js:6:14)
    at file:///home/anna/shop/src/index.js:4:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)`;
    expect(findErrorLocation(stack), 'Первый кадр ES-модуля').toEqual({
      file: '/home/anna/shop/src/delivery.js',
      line: 2,
      column: 22,
    });
  });

  it('кадр без имени функции', () => {
    const stack = `Error: boom
    at file:///home/anna/shop/src/index.js:4:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)`;
    expect(findErrorLocation(stack), 'Кадр «at место»').toEqual({ file: '/home/anna/shop/src/index.js', line: 4, column: 26 });
  });

  it('путь Windows с буквой диска', () => {
    const stack = `TypeError: x is not a function
    at calcTotal (C:\\Users\\anna\\shop\\src\\cart.js:7:21)
    at Object.<anonymous> (C:\\Users\\anna\\shop\\index.js:3:9)`;
    expect(findErrorLocation(stack), 'Путь Windows').toEqual({
      file: 'C:\\Users\\anna\\shop\\src\\cart.js',
      line: 7,
      column: 21,
    });
  });
});

describe('findErrorLocation: что пропускать', () => {
  it('внутренние кадры перед вашим', () => {
    const stack = `Error: x
    at Module._compile (node:internal/modules/cjs/loader:1706:14)
    at run (/home/anna/shop/app.js:10:5)`;
    expect(findErrorLocation(stack), 'Внутренний кадр первый').toEqual({ file: '/home/anna/shop/app.js', line: 10, column: 5 });
  });

  it('кадры без номеров', () => {
    const stack = `Error: x
    at new Promise (<anonymous>)
    at load (/home/anna/shop/app.js:3:1)`;
    expect(findErrorLocation(stack), 'Кадр <anonymous>').toEqual({ file: '/home/anna/shop/app.js', line: 3, column: 1 });
  });

  it('пустой текст', () => {
    expect(findErrorLocation(''), 'Пустая строка').toBeNull();
  });
});
