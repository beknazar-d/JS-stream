// Каждый тест начинается с чистого сообщения.
async function untilCleared() {
  await waitFor(() => $('#saved').textContent === '', 800);
}

describe('Сообщение «Сохранено»', () => {
  it('появляется сразу после нажатия', async () => {
    await untilCleared();
    await click('#save');
    expect($('#saved').textContent, 'Текст в #saved сразу после нажатия').toBe('Сохранено');
  });

  it('ещё висит через 150 мс', async () => {
    await untilCleared();
    await click('#save');
    await wait(150);
    expect($('#saved').textContent, 'Через 150 мс после нажатия сообщение должно ещё быть').toBe('Сохранено');
  });

  it('исчезает примерно через 300 мс', async () => {
    await untilCleared();
    await click('#save');
    await wait(420);
    expect($('#saved').textContent, 'Через 420 мс после нажатия сообщение должно исчезнуть').toBe('');
  });
});
