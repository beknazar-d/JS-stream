import { isSoldOut, statusText, describeStock } from './index.js';

describe('isSoldOut', () => {
  it('нулевой остаток распродан', () => {
    expect(isSoldOut(0), 'Остаток 0').toBe(true);
  });

  it('положительный остаток не распродан', () => {
    expect(isSoldOut(7), 'Остаток 7').toBe(false);
  });
});

describe('statusText', () => {
  it('подписи статусов', () => {
    expect(statusText('new'), 'Статус new').toBe('Новый');
    expect(statusText('paid'), 'Статус paid').toBe('Оплачен');
  });
});

describe('describeStock', () => {
  it('положительный остаток', () => {
    expect(describeStock(5), 'Остаток 5').toBe('В наличии: 5');
  });

  it('остаток не задан', () => {
    expect(describeStock(undefined), 'Остаток undefined').toBe('Нет данных');
  });
});
