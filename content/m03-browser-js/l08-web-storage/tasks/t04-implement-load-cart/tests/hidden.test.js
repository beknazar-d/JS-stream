const withCart = (value) => {
  localStorage.setItem('cart', value);
  return loadCart();
};

describe('Чтение корзины: странные данные', () => {
  it('JSON, но не массив', () => {
    expect(withCart('null'), 'null').toEqual([]);
    expect(withCart('42'), 'число').toEqual([]);
    expect(withCart('"cart"'), 'строка').toEqual([]);
    expect(withCart('{"id":1,"qty":1}'), 'объект вместо массива').toEqual([]);
  });

  it('пустая строка и нестандартный текст', () => {
    expect(withCart(''), 'пустая строка').toEqual([]);
    expect(withCart('undefined'), 'слово undefined').toEqual([]);
    expect(withCart('[object Object]'), 'результат записи массива без JSON.stringify').toEqual([]);
  });

  it('некорректные позиции отбрасываются, порядок остальных сохраняется', () => {
    const raw = JSON.stringify([
      { id: 1, qty: 2 },
      { id: 2, qty: 0 },
      { id: 3, qty: -1 },
      { id: 4, qty: 1.5 },
      { id: '5', qty: 1 },
      { id: 6, qty: '2' },
      null,
      'строка',
      { id: 7, qty: 1 },
    ]);
    expect(withCart(raw), 'Остались только позиции 1 и 7').toEqual([
      { id: 1, qty: 2 },
      { id: 7, qty: 1 },
    ]);
  });

  it('пустой массив остаётся пустым массивом', () => {
    expect(withCart('[]'), 'Пустая корзина').toEqual([]);
  });

  it('saveCart и loadCart возвращают то же самое', () => {
    const cart = [{ id: 3, qty: 4 }, { id: 8, qty: 1 }];
    saveCart(cart);
    expect(loadCart(), 'Круг записи и чтения').toEqual(cart);
  });
});
