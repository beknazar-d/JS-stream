import { bindAll } from './index.js';

describe('bindAll: тот же объект', () => {
  it('возвращает сам объект и меняет его на месте', () => {
    const obj = { count: 0, inc() { this.count = this.count + 1; } };
    expect(bindAll(obj) === obj, 'bindAll возвращает тот же объект').toBe(true);
    const { inc } = obj;
    inc();
    expect(obj.count, 'Извлечённый метод изменил исходный объект').toBe(1);
  });

  it('метод видит состояние, изменённое после привязки', () => {
    const obj = { rate: 1, price(x) { return x * this.rate; } };
    bindAll(obj);
    obj.rate = 3;
    const { price } = obj;
    expect(price(10), 'Курс изменён после bindAll').toBe(30);
  });
});

describe('bindAll: getters и повторный вызов', () => {
  it('getter не вызывается во время привязки', () => {
    let reads = 0;
    const obj = {
      label: 'Заказ',
      get status() {
        reads = reads + 1;
        return 'новый';
      },
      describe() {
        return this.label + ': ' + this.status;
      },
    };
    bindAll(obj);
    expect(reads, 'Getter не должен читаться при bindAll').toBe(0);
    expect(obj.status, 'Getter по-прежнему возвращает значение').toBe('новый');
    expect(reads, 'Чтение свойства вызывает getter').toBe(1);
  });

  it('getter, который выбрасывает ошибку, не ломает bindAll', () => {
    const obj = {
      get broken() {
        throw new Error('нет данных');
      },
      ping() {
        return 'ok';
      },
    };
    expect(() => bindAll(obj), 'bindAll не читает getter').not.toThrow();
    const { ping } = obj;
    expect(ping(), 'Обычный метод привязан').toBe('ok');
  });

  it('повторный вызов ничего не ломает', () => {
    const obj = { name: 'Склад', title() { return this.name; } };
    bindAll(obj);
    bindAll(obj);
    const { title } = obj;
    expect(title(), 'Метод после двух вызовов bindAll').toBe('Склад');
  });

  it('стрелочные свойства и пустой объект', () => {
    const obj = { double: (x) => x * 2 };
    bindAll(obj);
    expect(obj.double(4), 'Стрелка продолжает работать').toBe(8);
    expect(bindAll({}), 'Пустой объект').toEqual({});
  });
});
