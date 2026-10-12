describe('кнопка корзины', () => {
  it('подпись скрыта, кнопка остаётся квадратом 44 на 44', () => {
    const b = box('.icon-button');
    expect(Math.abs(b.width - 44) <= 2, `Ширина кнопки ${b.width}px, ждали 44px ±2`).toBe(true);
    expect(Math.abs(b.height - 44) <= 2, `Высота кнопки ${b.height}px, ждали 44px ±2`).toBe(true);
  });

  it('доступное имя кнопки сохранилось', () => {
    expect(labelOf('.icon-button'), 'Имя кнопки для скринридера').toBe('Открыть корзину');
  });
});

describe('.visually-hidden', () => {
  it('занимает не больше одного пикселя', () => {
    const b = box('.visually-hidden');
    expect(b.width <= 2 && b.height <= 2, `Размер скрытого текста ${b.width} на ${b.height}px, ждали не больше 1 на 1`).toBe(true);
  });

  it('не скрыт через display: none', () => {
    expect(css('.visually-hidden', 'display'), 'display скрытого текста').not.toBe('none');
    expect($('.visually-hidden').getClientRects().length, 'У элемента должна остаться рамка в раскладке').toBeGreaterThan(0);
  });
});
