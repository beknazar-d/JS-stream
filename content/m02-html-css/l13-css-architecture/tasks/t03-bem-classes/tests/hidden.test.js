import { bem } from './index.js';

describe('bem: пропуск и порядок', () => {
  it('пропускает false, null, undefined и пустую строку', () => {
    expect(bem('btn', null, { primary: false, size: null, tone: undefined, label: '' }), 'Все значения пустые').toBe('btn');
  });

  it('число 0 — допустимое значение', () => {
    expect(bem('btn', null, { quantity: 0 }), 'Значение 0').toBe('btn btn--quantity-0');
  });

  it('несколько модификаторов идут в порядке объекта', () => {
    expect(bem('btn', null, { size: 'large', primary: true, disabled: false, tone: 'warm' }), 'Порядок и пропуск').toBe(
      'btn btn--size-large btn--primary btn--tone-warm',
    );
  });

  it('без лишних пробелов', () => {
    const result = bem('product-card', 'title', { accent: true });
    expect(result, 'Нет пробелов по краям').toBe(result.trim());
    expect(result.includes('  '), 'Нет двойных пробелов').toBe(false);
  });

  it('третий аргумент можно не передавать', () => {
    expect(bem('badge', 'text'), 'Без модификаторов').toBe('badge__text');
  });
});

describe('bem: ошибки', () => {
  it('бросает ошибку без имени блока', () => {
    expect(() => bem(''), 'Пустая строка вместо блока').toThrow('Нужно имя блока');
    expect(() => bem(undefined, 'title'), 'undefined вместо блока').toThrow('Нужно имя блока');
    expect(() => bem(42), 'Число вместо блока').toThrow('Нужно имя блока');
  });
});
