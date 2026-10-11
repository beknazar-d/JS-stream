import { fullBoxes, looseItems, boxesToShip, isLastBoxFull } from './index.js';

describe('Ровно целое число коробок', () => {
  it('48 и 12', () => {
    expect(fullBoxes(48, 12), 'Полных коробок для 48 и 12').toBe(4);
    expect(looseItems(48, 12), 'Россыпи для 48 и 12 нет').toBe(0);
    expect(boxesToShip(48, 12), 'Лишней коробки быть не должно').toBe(4);
  });

  it('ровно одна полная коробка', () => {
    expect(fullBoxes(12, 12), 'Полных коробок для 12 и 12').toBe(1);
    expect(boxesToShip(12, 12), 'Коробок для 12 и 12').toBe(1);
  });
});

describe('Меньше одной коробки', () => {
  it('5 и 12', () => {
    expect(fullBoxes(5, 12), 'Полных коробок для 5 и 12').toBe(0);
    expect(looseItems(5, 12), 'Россыпью для 5 и 12').toBe(5);
    expect(boxesToShip(5, 12), 'Коробок для 5 и 12').toBe(1);
    expect(isLastBoxFull(5, 12), 'Коробка не заполнена').toBe(false);
  });

  it('одна штука', () => {
    expect(boxesToShip(1, 12), 'Одна штука требует коробку').toBe(1);
  });
});

describe('Пустой заказ', () => {
  it('0 и 12', () => {
    expect(fullBoxes(0, 12), 'Полных коробок в пустом заказе').toBe(0);
    expect(looseItems(0, 12), 'Россыпи в пустом заказе').toBe(0);
    expect(boxesToShip(0, 12), 'Коробок для пустого заказа').toBe(0);
    expect(isLastBoxFull(0, 12), 'Россыпи нет').toBe(true);
  });
});

describe('Другая вместимость', () => {
  it('100 штук по 8', () => {
    expect(fullBoxes(100, 8), 'Полных коробок для 100 и 8').toBe(12);
    expect(looseItems(100, 8), 'Россыпью для 100 и 8').toBe(4);
    expect(boxesToShip(100, 8), 'Всего коробок для 100 и 8').toBe(13);
  });

  it('вместимость 1', () => {
    expect(fullBoxes(7, 1), 'Полных коробок для 7 и 1').toBe(7);
    expect(isLastBoxFull(7, 1), 'Коробка на одну штуку всегда полная').toBe(true);
  });
});
