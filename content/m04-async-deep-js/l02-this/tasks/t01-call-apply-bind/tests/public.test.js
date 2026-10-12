import { viaCall, viaApply, bindTo } from './index.js';

const order = { id: 'ORD-1', status: 'новый' };

describe('call и apply', () => {
  it('viaCall задаёт this и передаёт префикс', () => {
    expect(viaCall(order, 'Заказ '), 'Вызов через call').toBe('Заказ ORD-1: новый');
  });

  it('viaApply принимает аргументы массивом', () => {
    expect(viaApply(order, ['№ ']), 'Вызов через apply').toBe('№ ORD-1: новый');
  });
});

describe('bind', () => {
  it('bindTo возвращает функцию', () => {
    expect(bindTo(order), 'bindTo не должна вызывать printOrder сразу').toBeTypeOf('function');
  });

  it('привязанная функция печатает свой заказ', () => {
    expect(bindTo(order)('Заказ '), 'Вызов привязанной функции').toBe('Заказ ORD-1: новый');
  });
});
