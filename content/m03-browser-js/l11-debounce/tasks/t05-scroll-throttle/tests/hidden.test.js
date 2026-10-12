const sleep = wait;

function scrollTo(y) {
  window.scrollTo(0, y);
  window.dispatchEvent(new Event('scroll'));
}

describe('Последнее событие серии', () => {
  it('серия, закончившаяся наверху, скрывает кнопку', async () => {
    scrollTo(900);
    await sleep(250);
    expect($('#top').hidden, 'Перед серией кнопка видна').toBe(false);
    scrollTo(800);
    await sleep(10);
    scrollTo(500);
    await sleep(10);
    scrollTo(200);
    await sleep(10);
    scrollTo(50);
    await sleep(250);
    expect($('#top').hidden, 'Прокрутка остановилась на 50 px: кнопка должна быть скрыта').toBe(true);
  });

  it('граница 400 px: на 399 скрыта, на 400 видна', async () => {
    scrollTo(399);
    await sleep(250);
    expect($('#top').hidden, 'На 399 px кнопка скрыта').toBe(true);
    scrollTo(400);
    await sleep(250);
    expect($('#top').hidden, 'На 400 px кнопка видна').toBe(false);
    scrollTo(0);
    await sleep(250);
  });

  it('после затишья счётчик перестаёт расти', async () => {
    scrollTo(300);
    await sleep(300);
    const before = Number($('#updates').textContent);
    await sleep(300);
    expect(Number($('#updates').textContent), 'Без событий прокрутки функция не вызывается').toBe(before);
  });
});
