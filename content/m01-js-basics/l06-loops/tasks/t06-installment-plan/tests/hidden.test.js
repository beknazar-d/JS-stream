import { buildInstallmentPlan } from './index.js';

function payments(plan) {
  return plan
    .split('\n')
    .filter((line) => line.startsWith('Месяц'))
    .map((line) => Number(line.split(': ')[1].replace(' руб.', '')));
}

describe('buildInstallmentPlan: расчёт', () => {
  it('минимальный срок — два месяца', () => {
    expect(buildInstallmentPlan(999, 2), 'Цена 999 на 2 месяца').toBe('Месяц 1: 499 руб.\nМесяц 2: 500 руб.\nИтого: 999 руб.');
  });

  it('максимальный срок — двенадцать месяцев', () => {
    const plan = buildInstallmentPlan(100000, 12);
    const list = payments(plan);
    expect(list, 'Платежей в графике на 12 месяцев').toHaveLength(12);
    expect(list[0], 'Первый платёж').toBe(8333);
    expect(list[11], 'Последний платёж').toBe(8337);
  });

  it('сумма платежей всегда равна цене', () => {
    for (const [price, months] of [[1, 2], [7, 3], [15990, 7], [50001, 12], [100, 5]]) {
      const total = payments(buildInstallmentPlan(price, months)).reduce((sum, value) => sum + value, 0);
      expect(total, `Сумма платежей для ${price} руб. на ${months} мес.`).toBe(price);
    }
  });

  it('нет перевода строки в конце', () => {
    expect(buildInstallmentPlan(6000, 2).endsWith('руб.'), 'Строка заканчивается итоговой строкой').toBe(true);
    expect(buildInstallmentPlan(6000, 2).endsWith('\n'), 'Нет завершающего перевода строки').toBe(false);
  });
});

describe('buildInstallmentPlan: некорректный ввод', () => {
  it('срок вне диапазона', () => {
    expect(buildInstallmentPlan(10000, 1), 'Срок 1 месяц').toBeNull();
    expect(buildInstallmentPlan(10000, 13), 'Срок 13 месяцев').toBeNull();
    expect(buildInstallmentPlan(10000, 0), 'Срок 0').toBeNull();
  });

  it('срок не целый', () => {
    expect(buildInstallmentPlan(10000, 2.5), 'Срок 2.5').toBeNull();
  });

  it('цена не подходит', () => {
    expect(buildInstallmentPlan(0, 3), 'Цена 0').toBeNull();
    expect(buildInstallmentPlan(-500, 3), 'Отрицательная цена').toBeNull();
    expect(buildInstallmentPlan(99.5, 3), 'Дробная цена').toBeNull();
  });

  it('не числа', () => {
    expect(buildInstallmentPlan('12000', 4), 'Цена строкой').toBeNull();
    expect(buildInstallmentPlan(12000, '4'), 'Срок строкой').toBeNull();
    expect(buildInstallmentPlan(NaN, 4), 'Цена NaN').toBeNull();
    expect(buildInstallmentPlan(undefined, undefined), 'Ничего не передано').toBeNull();
  });
});
