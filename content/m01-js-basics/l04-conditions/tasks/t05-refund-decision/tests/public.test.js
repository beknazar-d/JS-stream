import { refundDecision } from './index.js';

describe('refundDecision: прежнее поведение', () => {
  it('возврат одобрен в срок', () => {
    expect(refundDecision(5, false, false), '5 дней, товар новый, аккаунт в порядке').toBe('Возврат одобрен');
  });

  it('срок истёк', () => {
    expect(refundDecision(20, false, false), '20 дней').toBe('Срок возврата истёк');
  });

  it('товар использован', () => {
    expect(refundDecision(5, true, false), 'Использованный товар').toBe('Товар использован');
  });

  it('аккаунт заблокирован', () => {
    expect(refundDecision(5, false, true), 'Заблокированный аккаунт').toBe('Аккаунт заблокирован');
  });
});

describe('refundDecision: новое правило', () => {
  it('отрицательное число дней некорректно', () => {
    expect(refundDecision(-3, false, false), 'Покупка «в будущем»').toBe('Некорректная дата покупки');
  });
});
