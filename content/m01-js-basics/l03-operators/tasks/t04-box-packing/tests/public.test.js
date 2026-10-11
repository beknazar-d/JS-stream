import { fullBoxes, looseItems, boxesToShip, isLastBoxFull } from './index.js';

describe('Заказ на 47 штук, в коробке 12', () => {
  it('полные коробки', () => {
    expect(fullBoxes(47, 12), 'Полных коробок для 47 и 12').toBe(3);
  });

  it('штуки россыпью', () => {
    expect(looseItems(47, 12), 'Остаток для 47 и 12').toBe(11);
  });

  it('коробок к отправке', () => {
    expect(boxesToShip(47, 12), 'Всего коробок для 47 и 12').toBe(4);
  });

  it('последняя коробка неполная', () => {
    expect(isLastBoxFull(47, 12), 'Россыпь есть, значит, последняя коробка неполная').toBe(false);
  });
});

describe('Заказ на 48 штук, в коробке 12', () => {
  it('последняя коробка полная', () => {
    expect(isLastBoxFull(48, 12), 'Россыпи нет').toBe(true);
  });
});
