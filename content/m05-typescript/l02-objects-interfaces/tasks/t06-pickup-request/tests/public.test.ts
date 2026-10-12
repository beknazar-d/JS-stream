import { pickupSummary, totalWeight } from './index.js';
import type { PickupRequest } from './index.js';

const first: PickupRequest = {
  id: 501,
  company: 'ООО Ромашка',
  pickup: { city: 'Казань', street: 'Чехова 3', floor: 4, intercom: 'К1234' },
  contacts: ['+7 900 111-22-33', '+7 900 111-22-44'],
  cargo: { places: 3, weightKg: 41.5 },
  comment: 'заезд со двора',
};
const second: PickupRequest = {
  id: 502,
  company: 'ИП Лис',
  pickup: { city: 'Самара', street: 'Ленина 1' },
  contacts: [],
  cargo: { places: 1, weightKg: 7 },
};

describe('pickupSummary', () => {
  it('полная заявка', () => {
    expect(pickupSummary(first), 'Заявка 501').toBe('Заявка №501 (ООО Ромашка): Казань, Чехова 3, этаж 4, домофон К1234; мест: 3, вес: 41.5 кг');
  });
  it('заявка без этажа и домофона', () => {
    expect(pickupSummary(second), 'Заявка 502').toBe('Заявка №502 (ИП Лис): Самара, Ленина 1; мест: 1, вес: 7 кг');
  });
});

describe('totalWeight', () => {
  it('сумма двух заявок', () => {
    expect(totalWeight([first, second]), 'Вес двух заявок').toBe(48.5);
  });
  it('пустой список', () => {
    expect(totalWeight([]), 'Нет заявок').toBe(0);
  });
});
