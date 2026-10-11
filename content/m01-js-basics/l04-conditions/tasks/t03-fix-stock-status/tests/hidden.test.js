import { isSoldOut, statusText, describeStock } from './index.js';

describe('isSoldOut: другие значения', () => {
  it('остаток 1 ещё не распродан', () => {
    expect(isSoldOut(1), 'Остаток 1').toBe(false);
  });

  it('большой остаток не распродан', () => {
    expect(isSoldOut(1000), 'Остаток 1000').toBe(false);
  });
});

describe('statusText: все статусы', () => {
  it('shipped', () => {
    expect(statusText('shipped'), 'Статус shipped').toBe('Отправлен');
  });

  it('неизвестный статус', () => {
    expect(statusText('lost'), 'Статус lost').toBe('Неизвестный статус');
    expect(statusText(''), 'Пустой статус').toBe('Неизвестный статус');
  });
});

describe('describeStock: ноль и пустые значения', () => {
  it('ноль — это остаток, а не отсутствие данных', () => {
    expect(describeStock(0), 'Остаток 0').toBe('Нет в наличии');
  });

  it('null означает «данных нет»', () => {
    expect(describeStock(null), 'Остаток null').toBe('Нет данных');
  });

  it('остаток 1', () => {
    expect(describeStock(1), 'Остаток 1').toBe('В наличии: 1');
  });
});
