describe('Уведомление не уезжает при прокрутке', () => {
  it('после прокрутки страницы остаётся в углу окна', async () => {
    window.scrollTo(0, 300);
    await wait(50);
    try {
      const t = $('.toast').getBoundingClientRect();
      expect(Math.abs(t.bottom - (768 - 16)), 'Нижний край уведомления при прокрутке на 300px').toBeLessThanOrEqual(2);
      const el = document.elementFromPoint(t.left + t.width / 2, t.top + t.height / 2);
      expect(el && el.closest('.toast') !== null, 'Уведомление поверх слайдера и после прокрутки').toBe(true);
    } finally {
      window.scrollTo(0, 0);
    }
  });

  it('уведомление не сдвигает остальной контент', () => {
    expect(box('.slider').height, 'Высота слайдера прежняя').toBe(900);
    expect(box('.after').top, 'Текст под слайдером на прежнем месте').toBeLessThan(1100);
  });

  it('уведомление не растянулось на всю ширину', () => {
    expect(box('.toast').width, 'Уведомление по ширине текста').toBeLessThan(400);
  });
});
