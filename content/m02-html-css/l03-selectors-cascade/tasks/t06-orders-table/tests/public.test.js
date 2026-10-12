const rows = () => $$('tbody tr');
const cell = (row, index) => rows()[row].children[index];

describe('Выравнивание и отменённые заказы', () => {
  it('суммы выровнены по правому краю', () => {
    for (const el of $$('td.num, th.num')) {
      expect(css(el, 'text-align'), `Выравнивание «${el.textContent.trim()}»`).toBe('right');
    }
    expect(css(cell(0, 1), 'text-align'), 'Клиент выровнен по левому краю').toBe('left');
  });

  it('отменённые заказы серые и зачёркнутые', () => {
    for (const index of [3, 5]) {
      const td = cell(index, 1);
      expect(css(td, 'color'), `Цвет текста в строке ${index + 1}`).toBe('rgb(136, 136, 136)');
      expect(css(td, 'text-decoration-line'), `Зачёркивание в строке ${index + 1}`).toBe('line-through');
    }
  });

  it('обычные строки сохранили цвет библиотеки', () => {
    expect(css(cell(2, 1), 'color'), 'Цвет текста оплаченного заказа').toBe('rgb(51, 51, 51)');
    expect(css(cell(2, 1), 'text-decoration-line'), 'Оплаченный заказ не зачёркнут').toBe('none');
  });
});
