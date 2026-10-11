const rows = () => $$('tbody tr');
const cell = (row, index) => rows()[row].children[index];
const BLUE = 'rgb(231, 241, 255)';
const ZEBRA = 'rgb(245, 245, 245)';
const NONE = 'rgba(0, 0, 0, 0)';

describe('Подсветка новых и срочных', () => {
  it('новые заказы синие в нечётной и чётной строке', () => {
    expect(css(cell(0, 0), 'background-color'), 'Фон новой строки 1 (нечётная)').toBe(BLUE);
    expect(css(cell(1, 0), 'background-color'), 'Фон новой строки 2 (чётная, зебра серая)').toBe(BLUE);
    for (let i = 0; i < 4; i++) {
      expect(css(cell(1, i), 'background-color'), `Фон ячейки ${i + 1} в строке 2`).toBe(BLUE);
    }
  });

  it('остальные строки сохранили зебру библиотеки', () => {
    expect(css(cell(2, 0), 'background-color'), 'Фон строки 3 (нечётная)').toBe(NONE);
    expect(css(cell(3, 0), 'background-color'), 'Фон строки 4 (чётная)').toBe(ZEBRA);
    expect(css(cell(5, 0), 'background-color'), 'Фон строки 6 (чётная)').toBe(ZEBRA);
  });

  it('срочный заказ: красная полоса у первой ячейки', () => {
    const urgent = cell(4, 0);
    expect(css(urgent, 'border-left-width'), 'Толщина полосы').toBe('4px');
    expect(css(urgent, 'border-left-color'), 'Цвет полосы').toBe('rgb(221, 0, 0)');
    expect(css(urgent, 'border-left-style'), 'Стиль полосы').toBe('solid');
    expect(css(cell(4, 1), 'border-left-width'), 'У второй ячейки полосы нет').toBe('0px');
    expect(css(cell(0, 0), 'border-left-width'), 'У обычной строки полосы нет').toBe('0px');
  });

  it('библиотека не изменена', () => {
    const vendor = $('style#vendor').textContent;
    expect(vendor.includes('table.grid td { color: #333333; }'), 'Правило цвета библиотеки на месте').toBe(true);
    expect(vendor.includes('table.grid tbody tr:nth-child(even) td { background: #f5f5f5; }'), 'Правило зебры на месте').toBe(true);
    expect(vendor.includes('!important'), 'В библиотеку не должен попадать !important').toBe(false);
  });

  it('в styles.css нет !important и id', () => {
    const style = $('style[data-file="styles.css"]');
    expect(style.textContent.includes('!important'), 'В styles.css есть !important').toBe(false);
    const selectors = [...style.sheet.cssRules].map((r) => r.selectorText || '');
    expect(selectors.some((s) => s.includes('#')), 'Среди селекторов styles.css есть селектор по id').toBe(false);
  });
});
