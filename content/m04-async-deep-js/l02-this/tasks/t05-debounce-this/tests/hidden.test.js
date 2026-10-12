import { debounce } from './index.js';

describe('debounce: паузы', () => {
  it('вызовы с большой паузой выполняются оба', async () => {
    timers.useFake();
    const handler = fn();
    const save = debounce(handler, 100);
    save('a');
    await timers.advance(100);
    save('b');
    await timers.advance(100);
    expect(handler, 'Два отдельных вызова').toHaveBeenCalledTimes(2);
    expect(handler.mock.calls, 'Аргументы обоих вызовов').toEqual([['a'], ['b']]);
  });

  it('несколько аргументов передаются все', async () => {
    timers.useFake();
    const handler = fn();
    const save = debounce(handler, 50);
    save('ORD-1', 'paid');
    await timers.advance(50);
    expect(handler, 'Все аргументы').toHaveBeenCalledWith('ORD-1', 'paid');
  });

  it('после выполнения не остаётся таймеров', async () => {
    timers.useFake();
    const save = debounce(fn(), 50);
    save();
    await timers.advance(50);
    expect(timers.pending(), 'Ожидающих таймеров нет').toBe(0);
  });
});

describe('debounce: this и cancel', () => {
  it('this зависит от объекта, у которого вызвали', async () => {
    timers.useFake();
    const shared = debounce(function () {
      this.hits = (this.hits ?? 0) + 1;
    }, 10);
    const first = { run: shared };
    const second = { run: shared };
    first.run();
    await timers.advance(10);
    second.run();
    await timers.advance(10);
    expect(first.hits, 'Первый объект').toBe(1);
    expect(second.hits, 'Второй объект').toBe(1);
  });

  it('cancel отменяет отложенный вызов', async () => {
    timers.useFake();
    const handler = fn();
    const save = debounce(handler, 100);
    save('x');
    save.cancel();
    await timers.advance(500);
    expect(handler, 'После cancel вызова нет').not.toHaveBeenCalled();
  });

  it('после cancel debounce продолжает работать', async () => {
    timers.useFake();
    const handler = fn();
    const save = debounce(handler, 100);
    save('x');
    save.cancel();
    save('y');
    await timers.advance(100);
    expect(handler.mock.calls, 'Только вызов после cancel').toEqual([['y']]);
  });

  it('обёртка возвращает undefined', () => {
    timers.useFake();
    const save = debounce(() => 42, 10);
    expect(save(), 'Результат fn наружу не отдаётся').toBeUndefined();
  });
});
