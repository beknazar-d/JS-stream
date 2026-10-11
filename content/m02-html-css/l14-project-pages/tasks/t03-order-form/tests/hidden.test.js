function channel(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const rgbOf = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const WHITE = [255, 255, 255];
const fields = [
  ['name', 'Имя', 'text', 'name'],
  ['phone', 'Телефон', 'tel', 'tel'],
  ['email', 'Электронная почта', 'email', 'email'],
  ['address', 'Улица, дом, квартира', 'text', 'street-address'],
  ['city', 'Город', 'text', 'address-level2'],
  ['zip', 'Индекс', 'text', 'postal-code'],
];

describe('разметка формы', () => {
  it('form, h1 и fieldset с legend', () => {
    expect($('form.order'), 'Корень — элемент form').not.toBeNull();
    expect($$('h1'), 'Один h1').toHaveLength(1);
    expect($$('fieldset > legend'), 'Две группы fieldset с legend').toHaveLength(2);
    expect($$('legend').map((l) => l.textContent.trim()), 'Названия групп').toEqual(['Контакты', 'Доставка']);
  });

  for (const [id, label, type, auto] of fields) {
    it(`поле «${label}»`, () => {
      const el = $('#' + id);
      expect(labelOf(el), `Имя поля ${id}`).toBe(label);
      expect($(`label[for="${id}"]`), `Нужен label for="${id}"`).not.toBeNull();
      expect(el.getAttribute('type'), `type поля ${id}`).toBe(type);
      expect(el.getAttribute('autocomplete'), `autocomplete поля ${id}`).toBe(auto);
      expect(el.required, `Поле ${id} обязательное`).toBe(true);
    });
  }

  it('комментарий: подпись, не обязательное', () => {
    expect(labelOf('#comment'), 'Подпись комментария').toBe('Комментарий для курьера');
    expect($('#comment').required, 'Комментарий не обязателен').toBe(false);
  });

  it('варианты доставки — радиокнопки в label', () => {
    const radios = $$('input[type="radio"]');
    expect(radios, 'Радиокнопок').toHaveLength(2);
    expect(new Set(radios.map((r) => r.name)).size, 'У радиокнопок одно имя группы').toBe(1);
    for (const r of radios) expect(r.closest('label') !== null, 'Каждая радиокнопка внутри label').toBe(true);
  });

  it('кнопка отправки', () => {
    const b = $('.order__submit');
    expect(b.tagName, 'Кнопка отправки — button').toBe('BUTTON');
    expect(b.getAttribute('type'), 'type=submit').toBe('submit');
  });
});

describe('вид подписей и доступность', () => {
  it('подписи видны, над полем, 14px', () => {
    for (const [id] of fields) {
      const l = box(`label[for="${id}"]`);
      expect(l.height > 0 && l.width > 0, `Подпись поля ${id} должна быть видна`).toBe(true);
      expect(l.bottom <= box('#' + id).top + 1, `Подпись поля ${id} над полем`).toBe(true);
      expect(css(`label[for="${id}"]`, 'font-size'), 'Размер подписи').toBe('14px');
    }
  });

  it('радиокнопки в одну строку, высота от 44', () => {
    const [a, b] = $$('.choice').map((c) => box(c));
    expect(a.top === b.top, 'Варианты в одной строке').toBe(true);
    expect(a.height >= 44 && b.height >= 44, `Высота вариантов ${a.height} и ${b.height}`).toBe(true);
  });

  it('контраст рамки поля, подписи и кнопки', () => {
    const border = ratio(rgbOf(css('#name', 'border-top-color')), WHITE);
    expect(border >= 3, `Рамка поля ${border.toFixed(2)} к 1, нужно не меньше 3`).toBe(true);
    const label = ratio(rgbOf(css('label[for="name"]', 'color')), WHITE);
    expect(label >= 4.5, `Подпись ${label.toFixed(2)} к 1`).toBe(true);
    const btn = ratio(rgbOf(css('.order__submit', 'color')), rgbOf(css('.order__submit', 'background-color')));
    expect(btn >= 4.5, `Кнопка ${btn.toFixed(2)} к 1`).toBe(true);
  });

  for (const sel of ['#name', '#email', '#comment', '.order__submit']) {
    it(`фокус виден у ${sel}`, () => {
      const el = $(sel);
      el.focus();
      const s = getComputedStyle(el);
      expect(el.matches(':focus-visible'), 'Фокус должен считаться видимым').toBe(true);
      expect(s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2, `${sel}: нужна рамка outline от 2px`).toBe(true);
      const r = ratio(rgbOf(s.outlineColor), WHITE);
      expect(r >= 3, `${sel}: контраст рамки фокуса ${r.toFixed(2)} к 1`).toBe(true);
      el.blur();
    });
  }

  it('нет inline-стилей', () => {
    expect($$('[style]').length, 'Атрибутов style').toBe(0);
  });
});
