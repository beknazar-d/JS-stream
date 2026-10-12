import { viaCall, viaApply, bindTo } from './index.js';

describe('call, apply, bind: другие заказы', () => {
  it('работает с разными заказами', () => {
    const a = { id: 'ORD-1', status: 'новый' };
    const b = { id: 'ORD-2', status: 'в пути' };
    expect(viaCall(a, 'A: '), 'Первый заказ').toBe('A: ORD-1: новый');
    expect(viaCall(b, 'B: '), 'Второй заказ').toBe('B: ORD-2: в пути');
    expect(viaApply(b, ['B: ']), 'apply для второго заказа').toBe('B: ORD-2: в пути');
  });

  it('привязанную функцию можно вызвать много раз с разными префиксами', () => {
    const printer = bindTo({ id: 'ORD-3', status: 'доставлен' });
    expect(printer('Заказ '), 'Первый вызов').toBe('Заказ ORD-3: доставлен');
    expect(printer('№ '), 'Второй вызов с другим префиксом').toBe('№ ORD-3: доставлен');
  });

  it('привязка не переключается через call', () => {
    const a = { id: 'ORD-1', status: 'новый' };
    const b = { id: 'ORD-2', status: 'в пути' };
    expect(bindTo(a).call(b, 'Заказ '), 'this остался заказом a').toBe('Заказ ORD-1: новый');
  });

  it('привязанная функция остаётся рабочей после изменения заказа', () => {
    const order = { id: 'ORD-4', status: 'новый' };
    const printer = bindTo(order);
    order.status = 'отменён';
    expect(printer('Заказ '), 'Функция видит текущее состояние объекта').toBe('Заказ ORD-4: отменён');
  });
});
