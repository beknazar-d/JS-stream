describe('Отчёт склада', () => {
  it('скрипт запускается без ошибок', () => {
    expect(() => runSnippet('index.js'), 'Запуск index.js').not.toThrow();
  });

  it('печатает пять строк', () => {
    expect(runSnippet('index.js'), 'Количество строк отчёта').toHaveLength(5);
  });

  it('первые четыре строки совпадают с отчётом', () => {
    const lines = runSnippet('index.js');
    expect(lines.slice(0, 4), 'Строки 1–4 отчёта').toEqual(['Отчёт склада', 'В обработке: 12', 'Отгружено: 5', 'Возвраты: 2']);
  });
});
