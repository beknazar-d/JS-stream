describe('Сетка устойчива', () => {
  it('седьмая карточка начинает третий ряд', () => {
    const li = $('.card:nth-child(1)').cloneNode(true);
    $('.catalog').appendChild(li);
    try {
      expect(box('.card:nth-child(7)').left, 'Седьмая карточка в первой колонке').toBe(box('.card:nth-child(1)').left);
      expect(box('.card:nth-child(7)').top, 'Седьмая карточка в новом ряду').toBeGreaterThan(box('.card:nth-child(4)').bottom);
    } finally {
      li.remove();
    }
  });

  it('карточки выровнены по высоте внутри ряда', () => {
    $('.card:nth-child(2) p').textContent = 'Очень длинное описание блендера. '.repeat(8);
    try {
      expect(box('.card:nth-child(1)').height, 'Первая карточка ряда тянется до высоты соседней').toBe(box('.card:nth-child(2)').height);
    } finally {
      $('.card:nth-child(2) p').textContent = '4 990 ₽';
    }
  });

  it('это именно сетка из колонок', () => {
    expect(css('.catalog', 'display'), 'Контейнер использует Grid').toBe('grid');
    expect(css('.catalog', 'grid-template-columns').split(' '), 'Три колонки').toHaveLength(3);
  });
});
