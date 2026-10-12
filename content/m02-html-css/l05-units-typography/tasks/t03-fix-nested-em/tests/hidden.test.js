const withRoot = (px, fn) => {
  document.documentElement.style.fontSize = px + 'px';
  try { return fn(); } finally { document.documentElement.style.fontSize = ''; }
};

describe('Размер пунктов растёт вместе с настройкой браузера', () => {
  it('при корне 20px пункты любого уровня имеют 17.5px', () => {
    withRoot(20, () => {
      expect(css('.menu > li', 'font-size'), 'Первый уровень при корне 20px').toBe('17.5px');
      expect(css('.menu > li > ul > li', 'font-size'), 'Второй уровень при корне 20px').toBe('17.5px');
      expect(css('.menu > li > ul > li > ul > li', 'font-size'), 'Третий уровень при корне 20px').toBe('17.5px');
    });
  });
});
