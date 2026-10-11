const near = (a, b, d = 2) => Math.abs(a - b) <= d;

describe('Каркас страницы заказа', () => {
  it('ширина 960 и центр', () => {
    expect(box('.page').width, 'Ширина .page').toBe(960);
    expect(box('.page').left, 'Левый край .page').toBe(32);
  });

  it('строки занимают ширину содержимого', () => {
    for (const line of $$('.line')) expect(near(box(line).width, 910), `Ширина .line: ${box(line).width}, ожидалось 910`).toBe(true);
  });

  it('ширины ячеек', () => {
    for (const line of $$('.line')) {
      expect(near(box(line.querySelector('.name')).width, 540), 'Ширина .name').toBe(true);
      expect(near(box(line.querySelector('.qty')).width, 100), 'Ширина .qty').toBe(true);
      expect(near(box(line.querySelector('.sum')).width, 240), 'Ширина .sum').toBe(true);
    }
  });
});
