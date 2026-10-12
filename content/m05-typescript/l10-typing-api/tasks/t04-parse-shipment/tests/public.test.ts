import { parseShipment } from './index.js';

describe('parseShipment: верные данные', () => {
  it('отправление с курьером', () => {
    const raw = { id: 'S-1001', status: 'in_transit', weightKg: 2.5, courier: { id: 7, name: 'Анна' } };
    expect(parseShipment(raw), 'Верные данные дают ok: true и те же значения').toEqual({ ok: true, value: raw });
  });

  it('отправление без курьера', () => {
    const raw = { id: 'S-1002', status: 'created', weightKg: 10, courier: null };
    expect(parseShipment(raw)).toEqual({ ok: true, value: raw });
  });
});

describe('parseShipment: одна ошибка', () => {
  const base = { id: 'S-1', status: 'created', weightKg: 1, courier: null };

  it('вес строкой', () => {
    expect(parseShipment({ ...base, weightKg: '2.5' }), 'Вес "2.5" строкой не принимается').toEqual({
      ok: false,
      error: ['weightKg: ожидалось число больше нуля'],
    });
  });

  it('неизвестный статус', () => {
    expect(parseShipment({ ...base, status: 'shipped' })).toEqual({ ok: false, error: ['status: неизвестный статус'] });
  });

  it('не объект', () => {
    expect(parseShipment(42), 'Число вместо объекта').toEqual({ ok: false, error: ['ответ: ожидался объект'] });
  });
});
