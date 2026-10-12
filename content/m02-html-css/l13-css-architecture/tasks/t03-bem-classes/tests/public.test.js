import { bem } from './index.js';

describe('bem: блок и элемент', () => {
  it('только блок', () => {
    expect(bem('product-card'), 'Только блок').toBe('product-card');
  });

  it('блок и элемент', () => {
    expect(bem('product-card', 'title'), 'Блок и элемент').toBe('product-card__title');
  });

  it('пустой элемент означает сам блок', () => {
    expect(bem('btn', null), 'Элемент null').toBe('btn');
    expect(bem('btn', ''), 'Элемент пустая строка').toBe('btn');
    expect(bem('btn', undefined), 'Элемент undefined').toBe('btn');
  });
});

describe('bem: модификаторы', () => {
  it('логический модификатор', () => {
    expect(bem('product-card', null, { sale: true }), 'Карточка со скидкой').toBe('product-card product-card--sale');
  });

  it('модификатор со значением', () => {
    expect(bem('btn', null, { size: 'small' }), 'Размер кнопки').toBe('btn btn--size-small');
  });

  it('модификатор элемента', () => {
    expect(bem('product-card', 'price', { old: true }), 'Старая цена').toBe('product-card__price product-card__price--old');
  });
});
