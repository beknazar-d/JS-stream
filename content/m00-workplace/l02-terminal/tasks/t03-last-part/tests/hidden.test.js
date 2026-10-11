import { lastPart } from './index.js';

describe('lastPart: краевые случаи', () => {
  it('косая черта в конце', () => {
    expect(lastPart('/home/anna/shop/'), 'Прямая косая черта в конце').toBe('shop');
    expect(lastPart('C:\\Users\\anna\\shop\\'), 'Обратная косая черта в конце').toBe('shop');
  });

  it('корень и пустая строка', () => {
    expect(lastPart('/'), 'Корень').toBe('');
    expect(lastPart(''), 'Пустая строка').toBe('');
  });

  it('смешанные разделители', () => {
    expect(lastPart('C:/Users/anna\\shop'), 'Оба вида косых черт в одном пути').toBe('shop');
  });

  it('имя с точкой и пробелом', () => {
    expect(lastPart('/home/anna/price lists/may 2026.csv'), 'Файл с пробелами в имени').toBe('may 2026.csv');
  });
});
