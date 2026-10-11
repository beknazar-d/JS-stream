import { vat, lineTotal, parcelKind, orderNumber, discounted } from './index.js';

describe('Результаты не изменились', () => {
  it('vat', () => {
    expect(vat(500), 'НДС для 500').toBe(600);
  });

  it('lineTotal', () => {
    expect(lineTotal(300, 4), '4 штуки по 300').toBe(1200);
  });

  it('parcelKind', () => {
    expect(parcelKind(5), 'Посылка 5 кг').toBe('Тяжёлая');
    expect(parcelKind(2), 'Посылка 2 кг').toBe('Обычная');
  });

  it('orderNumber', () => {
    expect(orderNumber(42), 'Заказ 42').toBe('№00042');
  });

  it('discounted', () => {
    expect(discounted(2000, 10), 'Скидка 10%').toBe(1800);
  });
});
