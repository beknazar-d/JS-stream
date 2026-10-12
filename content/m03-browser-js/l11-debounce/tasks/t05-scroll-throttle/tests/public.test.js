const sleep = wait;

function scrollTo(y) {
  window.scrollTo(0, y);
  window.dispatchEvent(new Event('scroll'));
}

const updates = () => Number($('#updates').textContent);

describe('Троттлинг прокрутки', () => {
  it('на 20 событий за 300 мс функция выполняется от 2 до 7 раз', async () => {
    scrollTo(0);
    await sleep(250);
    const before = updates();
    for (let i = 1; i <= 20; i++) {
      scrollTo(i * 20);
      await sleep(15);
    }
    await sleep(250);
    const done = updates() - before;
    expect(done, 'Сколько раз выполнилась updateBackToTop на 20 событий за ~300 мс').toBeGreaterThanOrEqual(2);
    expect(done, 'Сколько раз выполнилась updateBackToTop на 20 событий за ~300 мс').toBeLessThanOrEqual(7);
  });

  it('первое событие после паузы обрабатывается сразу', async () => {
    scrollTo(0);
    await sleep(250);
    const before = updates();
    scrollTo(900);
    await sleep(25);
    expect(updates() - before, 'За 25 мс после первого события после паузы функция должна выполниться').toBe(1);
    expect($('#top').hidden, 'Страница прокручена на 900 px: кнопка видна').toBe(false);
  });
});
