describe('Граничные случаи', () => {
  it('блок «Похожие товары» не изменился', () => {
    expect($('.related .product-title').textContent.trim(), 'Заголовок похожего товара').toBe('Фен F-9');
  });

  it('в классах бейджа нет лишнего', () => {
    const names = [...$('.sale-badge').classList];
    expect(names.every((name) => !name.startsWith('.')), 'Имя класса пишут без точки: ' + names.join(', ')).toBe(true);
    expect(names, 'Классы бейджа').toContain('sale-badge');
  });

  it('текст записан в настоящее свойство', () => {
    expect('textcontent' in $('.stock-note'), 'Свойства textcontent (с маленькой c) быть не должно').toBe(false);
  });

  it('скрипт отработал без ошибок', () => {
    expect($$('main h1'), 'Заголовок h1 на месте').toHaveLength(1);
    expect($('.stock-note').textContent.trim(), 'Подпись после скрипта').not.toBe('Уточняем наличие');
  });
});
