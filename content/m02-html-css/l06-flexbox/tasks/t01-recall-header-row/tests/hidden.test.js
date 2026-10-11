describe('Устойчивость', () => {
  it('первый пункт меню начинается у края списка: промежуток только между пунктами', () => {
    expect(box('.nav li:first-child').left, 'Левый край первого пункта совпадает с краем списка').toBeLessThanOrEqual(box('.nav').left + 1);
    expect(box('.nav li:last-child').right, 'Правый край последнего пункта совпадает с краем списка').toBeGreaterThanOrEqual(box('.nav').right - 1);
  });

  it('новый пункт меню встаёт в тот же ряд с тем же промежутком', () => {
    const li = document.createElement('li');
    li.innerHTML = '<a href="/sale">Распродажа</a>';
    $('.nav').appendChild(li);
    try {
      const items = [1, 2, 3, 4].map((i) => box(`.nav li:nth-child(${i})`));
      expect(items[3].top, 'Четвёртый пункт в той же строке').toBe(items[0].top);
      expect(items[3].left - items[2].right, 'Промежуток перед новым пунктом').toBeGreaterThanOrEqual(22);
      expect(items[3].left - items[2].right, 'Промежуток перед новым пунктом').toBeLessThanOrEqual(26);
      expect(box('.cart').right, 'Корзина осталась у правого края').toBeGreaterThanOrEqual(998);
    } finally {
      li.remove();
    }
  });

  it('корзина прижата вправо при любом размере меню', () => {
    $('.logo').textContent = 'Домотека — бытовая техника';
    try {
      expect(box('.cart').right, 'Корзина осталась у правого края').toBeGreaterThanOrEqual(998);
    } finally {
      $('.logo').textContent = 'Домотека';
    }
  });
});
