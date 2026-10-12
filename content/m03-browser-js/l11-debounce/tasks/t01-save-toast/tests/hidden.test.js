async function untilCleared() {
  await waitFor(() => $('#saved').textContent === '', 800);
}

describe('Повторные нажатия', () => {
  it('второе нажатие продлевает показ на 300 мс от последнего нажатия', async () => {
    await untilCleared();
    await click('#save');
    await wait(200);
    await click('#save');
    await wait(200);
    expect($('#saved').textContent, 'Прошло 400 мс с первого нажатия, но только 200 мс со второго: сообщение ещё должно висеть').toBe('Сохранено');
    await wait(230);
    expect($('#saved').textContent, 'Со второго нажатия прошло больше 400 мс: сообщение должно исчезнуть').toBe('');
  });

  it('после исчезновения сообщение снова можно показать', async () => {
    await untilCleared();
    await click('#save');
    await wait(100);
    expect($('#saved').textContent).toBe('Сохранено');
    await wait(330);
    await click('#save');
    expect($('#saved').textContent, 'Новое нажатие после исчезновения показывает сообщение снова').toBe('Сохранено');
  });
});
