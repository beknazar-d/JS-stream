import { applyPatch } from './index.js';

describe('applyPatch', () => {
  it('меняет статус', () => {
    const order = { id: 1042, status: 'new', customer: { name: 'Анна Ким', city: 'Казань' } };
    expect(applyPatch(order, { status: 'paid' }).status, 'Статус после правки').toBe('paid');
  });

  it('добавляет заметку', () => {
    const order = { id: 1042, status: 'new', customer: { name: 'Анна Ким', city: 'Казань' } };
    expect(applyPatch(order, { note: 'Позвонить' }).note, 'Заметка').toBe('Позвонить');
  });
});
