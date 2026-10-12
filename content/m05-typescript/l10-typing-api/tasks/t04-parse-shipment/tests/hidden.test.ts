import { parseShipment } from './index.js';

const base = { id: 'S-1', status: 'created', weightKg: 1, courier: null };

describe('parseShipment: краевые случаи', () => {
  it('null и массив не объекты', () => {
    expect(parseShipment(null), 'null').toEqual({ ok: false, error: ['ответ: ожидался объект'] });
    expect(parseShipment([]), 'Массив').toEqual({ ok: false, error: ['ответ: ожидался объект'] });
    expect(parseShipment(undefined), 'undefined').toEqual({ ok: false, error: ['ответ: ожидался объект'] });
  });

  it('собирает все ошибки в порядке полей', () => {
    expect(parseShipment({ id: '', status: 'lost', weightKg: 0, courier: 'Анна' }), 'Четыре неверных поля').toEqual({
      ok: false,
      error: [
        'id: ожидалась непустая строка',
        'status: неизвестный статус',
        'weightKg: ожидалось число больше нуля',
        'courier: ожидался null или курьер с id и name',
      ],
    });
  });

  it('пустой объект даёт четыре ошибки', () => {
    const result = parseShipment({});
    expect(result.ok, 'Пустой объект').toBe(false);
    if (!result.ok) expect(result.error, 'Отсутствующие поля считаются неверными').toHaveLength(4);
  });

  it('вес: ноль, отрицательный, NaN и бесконечность', () => {
    for (const weightKg of [0, -1, NaN, Infinity]) {
      expect(parseShipment({ ...base, weightKg }).ok, `Вес ${weightKg} недопустим`).toBe(false);
    }
  });

  it('курьер без полей', () => {
    expect(parseShipment({ ...base, courier: {} }), 'Пустой объект вместо курьера').toEqual({
      ok: false,
      error: ['courier: ожидался null или курьер с id и name'],
    });
    expect(parseShipment({ ...base, courier: { id: '7', name: 'Анна' } }).ok, 'id курьера строкой').toBe(false);
    expect(parseShipment({ ...base, courier: { id: 7, name: '' } }).ok, 'Пустое имя курьера').toBe(false);
  });

  it('лишние поля не попадают в результат', () => {
    const result = parseShipment({ ...base, courier: { id: 7, name: 'Анна', phone: '1' }, note: 'позвонить' });
    expect(result, 'Только четыре известных поля, у курьера только id и name').toEqual({
      ok: true,
      value: { id: 'S-1', status: 'created', weightKg: 1, courier: { id: 7, name: 'Анна' } },
    });
  });
});
