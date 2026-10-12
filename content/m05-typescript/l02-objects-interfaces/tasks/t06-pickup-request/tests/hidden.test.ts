import { pickupSummary, totalWeight } from './index.js';
import type { PickupRequest } from './index.js';

const base: PickupRequest = {
  id: 1,
  company: 'Склад',
  pickup: { city: 'Пермь', street: 'Мира 9' },
  contacts: ['+7 900 000-00-00'],
  cargo: { places: 2, weightKg: 10 },
};

describe('pickupSummary: необязательные части', () => {
  it('только этаж', () => {
    expect(pickupSummary({ ...base, pickup: { ...base.pickup, floor: 2 } }), 'Этаж без домофона').toBe('Заявка №1 (Склад): Пермь, Мира 9, этаж 2; мест: 2, вес: 10 кг');
  });
  it('только домофон', () => {
    expect(pickupSummary({ ...base, pickup: { ...base.pickup, intercom: '77' } }), 'Домофон без этажа').toBe('Заявка №1 (Склад): Пермь, Мира 9, домофон 77; мест: 2, вес: 10 кг');
  });
  it('нулевой этаж выводится', () => {
    expect(pickupSummary({ ...base, pickup: { ...base.pickup, floor: 0 } }), 'Этаж 0 указан').toBe('Заявка №1 (Склад): Пермь, Мира 9, этаж 0; мест: 2, вес: 10 кг');
  });
  it('комментарий в сводку не попадает', () => {
    expect(pickupSummary({ ...base, comment: 'позвонить' }), 'С комментарием').toBe('Заявка №1 (Склад): Пермь, Мира 9; мест: 2, вес: 10 кг');
  });
});

describe('totalWeight: ещё случаи', () => {
  it('одна заявка', () => {
    expect(totalWeight([base]), 'Одна заявка').toBe(10);
  });
  it('дробные веса', () => {
    expect(totalWeight([{ ...base, cargo: { places: 1, weightKg: 0.5 } }, { ...base, cargo: { places: 1, weightKg: 0.25 } }]), 'Вес 0.5 и 0.25').toBe(0.75);
  });
});
