const totalText = () => $('.line-total').textContent.replace(/\s/g, ' ').trim();

describe('Поле количества', () => {
  it('ввод числа сразу пересчитывает сумму', async () => {
    await type('.qty', '3');
    expect($('.qty').value, 'Значение в поле').toBe('3');
    expect(totalText(), 'Сумма для 3 штук').toBe('8 970 ₽');
  });

  it('«плюс» и «минус» меняют количество на 1', async () => {
    await type('.qty', '3');
    await click('.plus');
    expect($('.qty').value, 'После плюса').toBe('4');
    expect(totalText(), 'Сумма для 4 штук').toBe('11 960 ₽');
    await click('.minus');
    await click('.minus');
    expect($('.qty').value, 'После двух минусов').toBe('2');
    expect(totalText(), 'Сумма для 2 штук').toBe('5 980 ₽');
  });

  it('число больше 99 исправляется на 99', async () => {
    await type('.qty', '150');
    expect($('.qty').value, 'Значение в поле').toBe('99');
    expect(totalText(), 'Сумма для 99 штук').toBe('296 010 ₽');
  });

  it('пустое поле исправляется на 1', async () => {
    await type('.qty', '');
    expect($('.qty').value, 'Значение в поле').toBe('1');
    expect(totalText(), 'Сумма для 1 штуки').toBe('2 990 ₽');
  });
});
