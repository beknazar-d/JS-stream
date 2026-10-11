describe('Скрипт склада', () => {
  it('печатает ровно три строки', () => {
    const lines = runSnippet('index.js');
    expect(lines, 'Количество строк вывода').toHaveLength(3);
  });

  it('первая строка — название склада', () => {
    const lines = runSnippet('index.js');
    expect(lines[0], 'Строка 1 вывода').toBe('Склад «Центральный»');
  });

  it('вторая строка — число заказов', () => {
    const lines = runSnippet('index.js');
    expect(lines[1], 'Строка 2 вывода. После двоеточия должен стоять пробел').toBe('Заказов в обработке: 12');
  });

  it('третья строка — статус', () => {
    const lines = runSnippet('index.js');
    expect(lines[2], 'Строка 3 вывода').toBe('Готов к отгрузке');
  });
});
