describe('Название видно целиком', () => {
  it('текст названия переносится, а не обрезается', () => {
    const el = $('.order-row:nth-child(1) .order-name');
    expect(el.scrollWidth, 'Содержимое названия не шире самого блока').toBeLessThanOrEqual(el.clientWidth + 1);
    expect(box('.order-row:nth-child(1) .order-name').height, 'Название заняло несколько строк').toBeGreaterThan(30);
    expect(css(el, 'overflow-x'), 'Название не скрыто через overflow').not.toBe('hidden');
  });

  it('сумма в одну строку', () => {
    const range = document.createRange();
    range.selectNodeContents($('.order-row:nth-child(1) .order-sum'));
    expect(range.getClientRects().length, 'Текст суммы занимает одну строку').toBe(1);
  });

  it('короткая строка выглядит как раньше', () => {
    const row = box('.order-row:nth-child(2)');
    const name = box('.order-row:nth-child(2) .order-name');
    const sum = box('.order-row:nth-child(2) .order-sum');
    expect(Math.abs(sum.right - (row.right - 17)), 'Сумма у правого края строки').toBeLessThanOrEqual(2);
    expect(name.height, 'Короткое название в одну строку').toBeLessThan(30);
  });

  it('строка с другим очень длинным словом ведёт себя так же', () => {
    const el = $('.order-row:nth-child(2) .order-name');
    el.textContent = 'Электрический_водонагреватель_накопительный_Termex_ULTRA_100_литров';
    try {
      const row = box('.order-row:nth-child(2)');
      expect(box('.order-row:nth-child(2) .order-sum').right, 'Сумма внутри строки').toBeLessThanOrEqual(row.right);
      expect(el.scrollWidth, 'Текст внутри блока').toBeLessThanOrEqual(el.clientWidth + 1);
    } finally {
      el.textContent = 'Чайник K-200';
    }
  });
});
