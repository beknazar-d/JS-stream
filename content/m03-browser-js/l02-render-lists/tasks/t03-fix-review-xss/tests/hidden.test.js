describe('Безопасность', () => {
  it('код из onerror не выполнился', async () => {
    await wait(150);
    expect(window.__pwned, 'window.__pwned не должен появиться').toBeUndefined();
  });

  it('в каждом отзыве только два span и ничего больше', () => {
    for (const li of $$('.reviews .review')) {
      expect(li.children.length, 'Дочерних элементов у отзыва').toBe(2);
      expect([...li.children].map((el) => el.tagName), 'Теги внутри отзыва').toEqual(['SPAN', 'SPAN']);
    }
  });

  it('список не содержит лишних узлов', () => {
    expect($('.reviews').children.length, 'Прямых детей у списка').toBe(3);
  });

  it('отзыв с кавычками-кодами не изменился', () => {
    const text = $$('.reviews .review')[1].querySelector('.review__text').textContent;
    expect(text.includes('&quot;'), 'Литерал &quot; остался в тексте').toBe(true);
  });
});
