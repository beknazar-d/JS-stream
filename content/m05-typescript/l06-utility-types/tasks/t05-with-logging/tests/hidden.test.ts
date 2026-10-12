import { withLogging } from './index.js';

describe('withLogging: детали', () => {
  it('ошибка пробрасывается, журнал пуст', () => {
    const lines: string[] = [];
    const broken = withLogging((): number => {
      throw new Error('Шлюз недоступен');
    }, 'charge', (line: string) => lines.push(line));
    expect(() => broken(), 'Вызов обёртки над упавшей функцией').toThrow('Шлюз недоступен');
    expect(lines, 'Журнал после ошибки').toEqual([]);
  });

  it('функция без аргументов', () => {
    const lines: string[] = [];
    const logged = withLogging(() => 'ok', 'ping', (line: string) => lines.push(line));
    expect(logged(), 'Результат без аргументов').toBe('ok');
    expect(lines, 'Журнал без аргументов').toEqual(['ping() = ok']);
  });

  it('результат 0 попадает в журнал', () => {
    const lines: string[] = [];
    const zero = withLogging((value: number) => value - value, 'zero', (line: string) => lines.push(line));
    expect(zero(5), 'Результат 0').toBe(0);
    expect(lines[0], 'Запись с нулём').toBe('zero(5) = 0');
  });

  it('несколько обёрток независимы', () => {
    const first: string[] = [];
    const second: string[] = [];
    const a = withLogging((x: number) => x + 1, 'a', (line: string) => first.push(line));
    const b = withLogging((x: number) => x * 2, 'b', (line: string) => second.push(line));
    a(1);
    b(2);
    expect(first, 'Журнал a').toEqual(['a(1) = 2']);
    expect(second, 'Журнал b').toEqual(['b(2) = 4']);
  });
});
