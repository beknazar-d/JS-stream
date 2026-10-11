const withRoot = (px, fn) => {
  document.documentElement.style.fontSize = px + 'px';
  try { return fn(); } finally { document.documentElement.style.fontSize = ''; }
};

describe('Масштабирование при корне 20px', () => {
  it('размеры шрифта и межстрочье', () => {
    withRoot(20, () => {
      expect(css('.card h2', 'font-size'), 'Заголовок: 24px → 30px').toBe('30px');
      expect(css('.card h2', 'line-height'), 'Межстрочье заголовка: 30px → 37.5px').toBe('37.5px');
      expect(css('.card p', 'font-size'), 'Абзац: 16px → 20px').toBe('20px');
      expect(css('.card p', 'line-height'), 'Межстрочье абзаца: 24px → 30px').toBe('30px');
    });
  });

  it('отступы и ширина растут вместе с текстом', () => {
    withRoot(20, () => {
      expect(css('.card', 'padding-top'), 'Отступ карточки: 20px → 25px').toBe('25px');
      expect(box('.card').width, 'Ширина карточки: 320px → 400px').toBe(400);
      expect(css('.btn', 'padding-top'), 'Отступ кнопки сверху: 12px → 15px').toBe('15px');
      expect(css('.btn', 'padding-left'), 'Отступ кнопки сбоку: 24px → 30px').toBe('30px');
    });
  });

  it('тонкая рамка остаётся 1px', () => {
    withRoot(20, () => {
      expect(css('.card', 'border-top-width'), 'Рамка карточки не должна расти').toBe('1px');
    });
  });

  it('межстрочье записано числом, а не длиной', () => {
    const p = $('.card p');
    p.style.fontSize = '30px';
    try {
      expect(parseFloat(css(p, 'line-height')), 'Если шрифт абзаца 30px, межстрочье должно быть 45px').toBeCloseTo(45, 0);
    } finally {
      p.style.fontSize = '';
    }
  });
});
