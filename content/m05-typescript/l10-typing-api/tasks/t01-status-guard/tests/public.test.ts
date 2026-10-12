import { isShipmentStatus } from './index.js';

describe('isShipmentStatus', () => {
  it('принимает все четыре статуса', () => {
    for (const status of ['created', 'in_transit', 'delivered', 'cancelled']) {
      expect(isShipmentStatus(status), `Статус «${status}» настоящий`).toBe(true);
    }
  });

  it('отклоняет неизвестные строки', () => {
    for (const text of ['shipped', '', 'Delivered', ' delivered']) {
      expect(isShipmentStatus(text), `Строка «${text}» не статус: регистр и пробелы важны`).toBe(false);
    }
  });

  it('отклоняет значения других типов', () => {
    for (const value of [null, undefined, 3, true, {}]) {
      expect(isShipmentStatus(value), 'Не строка не может быть статусом').toBe(false);
    }
  });
});
