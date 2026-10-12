describe('Граница и подход «сначала телефон»', () => {
  it('на 767px плашка ещё скрыта', async () => {
    await viewport(767);
    expect(css('.promo', 'display'), 'Ширина 767px — это ещё телефон, плашка скрыта').toBe('none');
    await viewport(1024);
  });

  it('медиазапрос написан через min-width', () => {
    const conditions = [];
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSMediaRule) conditions.push(rule.media.mediaText);
      }
    }
    expect(conditions.some((text) => /min-width/.test(text)), 'Нужен медиазапрос с min-width: сначала стили телефона, потом дополнения для широких экранов').toBe(true);
    expect(conditions.some((text) => /max-width/.test(text)), 'Запрос с max-width не нужен: он описывает «сверху вниз»').toBe(false);
  });
});
