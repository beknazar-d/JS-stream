describe('Строка заказа с длинным названием', () => {
  it('сумма остаётся внутри строки', () => {
    const row = box('.order-row:nth-child(1)');
    const sum = box('.order-row:nth-child(1) .order-sum');
    expect(sum.right, 'Правый край суммы внутри строки (сейчас ' + sum.right + ', край строки ' + row.right + ')').toBeLessThanOrEqual(row.right);
  });

  it('название не налезает на сумму', () => {
    const name = box('.order-row:nth-child(1) .order-name');
    const sum = box('.order-row:nth-child(1) .order-sum');
    expect(name.right, 'Название заканчивается левее суммы').toBeLessThanOrEqual(sum.left);
  });

  it('строка не вылезла за ширину 480px', () => {
    expect(box('.order-row:nth-child(1)').width, 'Ширина строки').toBe(480);
    expect(document.documentElement.scrollWidth, 'Страница не получила горизонтальной прокрутки').toBeLessThanOrEqual(1024);
  });
});
