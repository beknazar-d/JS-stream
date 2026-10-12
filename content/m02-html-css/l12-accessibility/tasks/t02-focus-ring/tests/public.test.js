const targets = [
  ['.nav a', 'ссылка меню'],
  ['.search__input', 'поле поиска'],
  ['.search__button', 'кнопка «Найти»'],
  ['.sort', 'список сортировки'],
  ['.product__buy', 'кнопка «В корзину»'],
];

function ringOf(selector) {
  const el = $(selector);
  el.focus();
  const style = getComputedStyle(el);
  const outline = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2;
  const shadow = style.boxShadow !== 'none';
  el.blur();
  return { outline, shadow, visible: el.matches(':focus-visible') };
}

describe('видимый фокус', () => {
  for (const [selector, name] of targets) {
    it(`${name} получает рамку при фокусе`, () => {
      const el = $(selector);
      el.focus();
      expect(document.activeElement === el, `${name} должен принимать фокус`).toBe(true);
      expect(el.matches(':focus-visible'), `${name}: браузер должен считать фокус видимым`).toBe(true);
      el.blur();
      const ring = ringOf(selector);
      expect(ring.outline || ring.shadow, `${name}: при фокусе нужна рамка outline от 2px или тень box-shadow`).toBe(true);
    });
  }
});
