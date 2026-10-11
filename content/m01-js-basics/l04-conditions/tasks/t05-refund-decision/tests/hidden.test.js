import { refundDecision } from './index.js';

describe('refundDecision: границы срока', () => {
  it('в день покупки и на 14-й день возврат одобрен', () => {
    expect(refundDecision(0, false, false), 'В день покупки').toBe('Возврат одобрен');
    expect(refundDecision(14, false, false), '14-й день').toBe('Возврат одобрен');
  });

  it('на 15-й день срок истёк', () => {
    expect(refundDecision(15, false, false), '15-й день').toBe('Срок возврата истёк');
  });
});

describe('refundDecision: приоритет проверок', () => {
  it('блокировка важнее использованности', () => {
    expect(refundDecision(5, true, true), 'Заблокирован и товар использован').toBe('Аккаунт заблокирован');
  });

  it('блокировка важнее срока', () => {
    expect(refundDecision(30, false, true), 'Заблокирован и срок истёк').toBe('Аккаунт заблокирован');
  });

  it('использованность важнее срока', () => {
    expect(refundDecision(30, true, false), 'Использован и срок истёк').toBe('Товар использован');
  });
});

describe('refundDecision: некорректная дата', () => {
  it('NaN и undefined некорректны', () => {
    expect(refundDecision(NaN, false, false), 'NaN дней').toBe('Некорректная дата покупки');
    expect(refundDecision(undefined, false, false), 'Дата не передана').toBe('Некорректная дата покупки');
  });

  it('некорректная дата важнее всех остальных проверок', () => {
    expect(refundDecision(-1, true, true), 'Минус день, заблокирован, использован').toBe('Некорректная дата покупки');
  });
});
