const cards = () => $$('.card').map((_, i) => box(`.card:nth-child(${i + 1})`));
const btns = () => $$('.btn').map((_, i) => box(`.card:nth-child(${i + 1}) .btn`));

describe('Граничные случаи', () => {
  it('очень длинное описание: кнопки остаются на одной линии и не налезают на цену', () => {
    const desc = $('.card:nth-child(1) .desc');
    const old = desc.textContent;
    desc.textContent = old + ' ' + 'Дополнительный текст описания. '.repeat(12);
    try {
      const b = btns();
      expect(b.every((x) => Math.abs(x.bottom - b[0].bottom) <= 1), 'Кнопки на одной линии').toBe(true);
      const price = box('.card:nth-child(1) .price');
      expect(b[0].top, 'Кнопка ниже цены').toBeGreaterThanOrEqual(price.bottom);
      const c = cards();
      expect(c.every((x) => Math.abs(x.height - c[0].height) <= 1), 'Высоты карточек одинаковы').toBe(true);
    } finally {
      desc.textContent = old;
    }
  });

  it('четвёртая карточка: ширины остаются равными', () => {
    const li = $('.card:nth-child(1)').cloneNode(true);
    li.querySelector('h3').textContent = 'Электрический гриль с очень длинным названием модели';
    $('.cards').appendChild(li);
    try {
      const c = cards();
      expect(c, 'Теперь четыре карточки').toHaveLength(4);
      expect(c.every((x) => Math.abs(x.width - c[0].width) <= 2), 'Ширины равны независимо от длины названия').toBe(true);
    } finally {
      li.remove();
    }
  });
});
