import { withLogging } from './index.js';

function calcDeliveryFee(zone: string, weightKg: number): number {
  return (zone === 'north' ? 120 : 90) + weightKg * 15;
}

describe('withLogging', () => {
  it('пишет строку журнала и возвращает результат', () => {
    const lines: string[] = [];
    const logged = withLogging(calcDeliveryFee, 'calcDeliveryFee', (line: string) => lines.push(line));
    expect(logged('north', 3), 'Результат обёртки').toBe(165);
    expect(lines, 'Журнал после одного вызова').toEqual(['calcDeliveryFee(north, 3) = 165']);
  });

  it('журнал пишется на каждый вызов', () => {
    const log = fn();
    const logged = withLogging(calcDeliveryFee, 'fee', log);
    logged('south', 1);
    logged('north', 2);
    expect(log, 'Количество записей').toHaveBeenCalledTimes(2);
    expect(log, 'Вторая запись').toHaveBeenCalledWith('fee(north, 2) = 150');
  });

  it('передаёт аргументы без изменений', () => {
    const inner = fn((a: unknown, b: unknown) => `${String(a)}${String(b)}`);
    const logged = withLogging(inner as (a: string, b: number) => string, 'join', () => {});
    expect(logged('A', 5), 'Результат').toBe('A5');
    expect(inner, 'Аргументы исходной функции').toHaveBeenCalledWith('A', 5);
  });
});
