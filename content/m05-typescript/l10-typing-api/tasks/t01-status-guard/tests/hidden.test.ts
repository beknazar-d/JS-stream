import { isShipmentStatus } from './index.js';

describe('isShipmentStatus: скрытые случаи', () => {
  it('массив с одним статусом не статус', () => {
    expect(isShipmentStatus(['delivered']), 'Массив не превращается в строку').toBe(false);
  });

  it('объект с toString не статус', () => {
    expect(isShipmentStatus({ toString: () => 'delivered' }), 'Объект остаётся объектом, даже если умеет быть строкой').toBe(false);
  });

  it('объект String не статус', () => {
    expect(isShipmentStatus(new String('delivered')), 'Объект-обёртка String не примитивная строка').toBe(false);
  });
});
