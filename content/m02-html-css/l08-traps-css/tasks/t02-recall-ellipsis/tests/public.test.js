const title = (n) => `.order:nth-child(${n}) .order-title`;

describe('Название заказа в одну строку', () => {
  it('длинное название занимает одну строку', () => {
    const b = box(title(1));
    expect(b.height, 'Высота названия — одна строка, сейчас ' + b.height + 'px').toBeLessThan(30);
  });

  it('длинное название не выходит за карточку', () => {
    expect(box(title(1)).right, 'Правый край названия внутри карточки').toBeLessThanOrEqual(box('.order:nth-child(1)').right - 15);
  });

  it('вместо хвоста стоит многоточие', () => {
    expect(css(title(1), 'text-overflow'), 'Свойство text-overflow').toBe('ellipsis');
  });

  it('полный текст остаётся в разметке', () => {
    expect($(title(1)).textContent, 'Текст названия не обрезан в DOM').toContain('доставка в четверг');
  });
});
