import formatRub, { formatQty, CURRENCY } from './format.js';
import { describeLine } from './index.js';

describe('Экспорты format.js', () => {
  it('formatRub доступна по умолчанию', () => {
    expect(typeof formatRub, 'Импорт по умолчанию из format.js').toBe('function');
    expect(formatRub(300), 'formatRub(300)').toBe('300 ₽');
  });

  it('formatQty доступна по имени', () => {
    expect(typeof formatQty, 'Именованный импорт formatQty').toBe('function');
    expect(formatQty(5), 'formatQty(5)').toBe('5 шт.');
  });

  it('CURRENCY доступна по имени', () => {
    expect(CURRENCY, 'Именованный импорт CURRENCY').toBe('RUB');
  });
});

describe('describeLine', () => {
  it('работает с другими данными', () => {
    expect(describeLine('Фильтры', 10, 300), 'Фильтры, 10 штук по 300').toBe('Фильтры: 10 шт. × 300 ₽ (RUB)');
  });
});
