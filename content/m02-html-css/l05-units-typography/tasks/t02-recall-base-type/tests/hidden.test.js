const withRoot = (px, fn) => {
  document.documentElement.style.fontSize = px + 'px';
  try { return fn(); } finally { document.documentElement.style.fontSize = ''; }
};

describe('Масштабирование', () => {
  it('размеры растут вместе с размером шрифта браузера', () => {
    withRoot(20, () => {
      expect(css('h1', 'font-size'), 'При корне 20px заголовок 2rem равен 40px').toBe('40px');
      expect(css('.lead', 'font-size'), 'При корне 20px вводный абзац равен 25px').toBe('25px');
      expect(css('.note', 'font-size'), 'При корне 20px примечание равно 17.5px').toBe('17.5px');
    });
  });

  it('line-height записан числом и пересчитывается у каждого элемента', () => {
    withRoot(20, () => {
      expect(css('.text', 'line-height'), 'При корне 20px межстрочье основного текста 30px').toBe('30px');
    });
    $('.lead').style.fontSize = '30px';
    try {
      expect(parseFloat(css('.lead', 'line-height')), 'Если у абзаца размер 30px, межстрочье должно быть 45px: число умножается на свой размер').toBeCloseTo(45, 0);
    } finally {
      $('.lead').style.fontSize = '';
    }
  });

  it('корень не сброшен: html остаётся 16px', () => {
    expect(css('html', 'font-size'), 'Не задавайте html { font-size } в пикселях').toBe('16px');
  });
});
