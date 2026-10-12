import { cards, priceOf, settle } from './helpers.js';

describe('Детали карточек', () => {
  it('товар без остатка помечен', async () => {
    await settle();
    const toaster = cards().find((card) => card.querySelector('.card__title').textContent.includes('Тостер'));
    expect(toaster, 'Тостер Vento T-2 есть на первой странице').toBeDefined();
    expect(toaster.querySelector('.card__stock').textContent.trim(), 'Подпись у товара с нулевым остатком').toBe('Нет в наличии');
    expect(toaster.classList.contains('card--out'), 'Класс card--out у товара не в наличии').toBe(true);
  });

  it('у товара в наличии нет класса card--out', async () => {
    await settle();
    expect(cards()[0].classList.contains('card--out'), 'Первый товар в наличии').toBe(false);
  });

  it('цены всех шести карточек верные', async () => {
    await settle();
    expect(cards().map(priceOf), 'Цены карточек по порядку').toEqual([2990, 2490, 1990, 3200, 18900, 5490]);
  });

  it('карточки собраны как li внутри списка #grid', async () => {
    await settle();
    expect($$('#grid > li.card'), 'Все карточки: li.card прямо внутри #grid').toHaveLength(6);
    expect(cards().every((card) => card.querySelector('h3.card__title') && card.querySelector('p.card__price')), 'В каждой карточке h3.card__title и p.card__price').toBe(true);
  });
});
