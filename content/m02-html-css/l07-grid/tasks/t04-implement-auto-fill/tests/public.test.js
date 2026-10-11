const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1})`));
const columns = () => new Set(cards().map((c) => c.left)).size;

describe('Каталог подстраивается под ширину окна', () => {
  it('в окне 1024px — четыре колонки', () => {
    expect(columns(), 'Колонок в окне 1024px').toBe(4);
  });

  it('в окне 700px — три колонки', async () => {
    await viewport(700);
    try {
      expect(columns(), 'Колонок в окне 700px').toBe(3);
    } finally {
      await viewport(1024);
    }
  });

  it('в окне 375px — одна колонка', async () => {
    await viewport(375);
    try {
      expect(columns(), 'Колонок в окне 375px').toBe(1);
    } finally {
      await viewport(1024);
    }
  });

  it('карточки заполняют колонку main до правого края', () => {
    const main = box('main');
    const rightmost = Math.max(...cards().map((c) => c.right));
    expect(Math.abs(rightmost - (main.right - 16)), 'Правый край последней колонки у правого края main').toBeLessThanOrEqual(2);
  });
});
