import { buildSchedule } from './index.js';

const order = (id, createdAt, days) => ({ id, createdAt, days });

describe('Порядок и сегодняшний день', () => {
  const orders = [
    order(3, '2025-03-07T23:30:00Z', 5),
    order(1, '2025-03-03T09:00:00Z', 3),
    order(2, '2025-03-06T15:20:00Z', 2),
  ];

  it('самые срочные заказы идут первыми', () => {
    const { items } = buildSchedule(orders, new Date('2025-03-10T15:00:00Z'));
    expect(items.map((item) => item.id), 'Порядок номеров заказов').toEqual([1, 2, 3]);
    expect(items[2], 'Заказ 3: Fri 7 марта + 5 рабочих дней').toEqual({
      id: 3,
      deliverBy: '2025-03-14',
      label: 'пятница, 14 марта 2025 г.',
      daysLeft: 4,
      late: false,
    });
  });

  it('при равных сроках порядок по номеру', () => {
    const { items } = buildSchedule([order(9, '2025-03-06T10:00:00Z', 2), order(4, '2025-03-06T20:00:00Z', 2)], new Date('2025-03-06T00:00:00Z'));
    expect(items.map((item) => item.id), 'Одинаковый срок').toEqual([4, 9]);
  });

  for (const time of ['00:00:00.000', '12:00:00.000', '23:59:59.999']) {
    it(`день доставки сегодня не просрочен в ${time}`, () => {
      const { items } = buildSchedule([order(2, '2025-03-06T15:20:00Z', 2)], new Date(`2025-03-10T${time}Z`));
      expect(items[0].daysLeft, `Осталось дней в ${time}`).toBe(0);
      expect(items[0].late, `Просрочка в ${time}`).toBe(false);
    });
  }

  it('на следующий день заказ просрочен', () => {
    const { items } = buildSchedule([order(2, '2025-03-06T15:20:00Z', 2)], new Date('2025-03-11T00:00:00Z'));
    expect(items[0].daysLeft, 'Осталось дней').toBe(-1);
    expect(items[0].late, 'Просрочка').toBe(true);
  });

  it('срок считается от дня создания по UTC', () => {
    const { items } = buildSchedule([order(5, '2025-03-07T23:59:59Z', 1)], new Date('2025-03-07T00:00:00Z'));
    expect(items[0].deliverBy, 'Пятница 23:59 UTC плюс 1 рабочий день').toBe('2025-03-10');
  });
});

describe('Праздники и подписи', () => {
  it('праздники учитываются', () => {
    const { items } = buildSchedule([order(1, '2025-04-30T10:00:00Z', 1)], new Date('2025-04-30T00:00:00Z'), ['2025-05-01', '2025-05-02']);
    expect(items[0].deliverBy, 'Доставка через майские праздники').toBe('2025-05-05');
    expect(items[0].label, 'Подпись').toBe('понедельник, 5 мая 2025 г.');
  });

  it('подпись для декабря и января', () => {
    const { items } = buildSchedule([order(1, '2025-12-30T10:00:00Z', 1), order(2, '2025-12-30T10:00:00Z', 2)], new Date('2025-12-30T00:00:00Z'));
    expect(items.map((item) => item.label), 'Подписи на стыке года').toEqual(['среда, 31 декабря 2025 г.', 'четверг, 1 января 2026 г.']);
  });
});

describe('Испорченные заказы', () => {
  const today = new Date('2025-03-10T00:00:00Z');

  it('не мешают остальным', () => {
    const result = buildSchedule([order(1, 'abc', 2), order(2, '2025-03-06T10:00:00Z', 2), order(3, '', 1)], today);
    expect(result.items.map((item) => item.id), 'Хороший заказ остался').toEqual([2]);
    expect(result.errors, 'Два плохих заказа').toEqual([
      { id: 1, message: 'Некорректная дата заказа' },
      { id: 3, message: 'Некорректная дата заказа' },
    ]);
  });

  it('дата не строка', () => {
    const result = buildSchedule([order(1, null, 2), order(2, undefined, 2), order(3, 0, 2)], today);
    expect(result.errors.map((error) => error.id), 'null, undefined и число вместо строки').toEqual([1, 2, 3]);
    expect(result.items, 'Хороших заказов нет').toEqual([]);
  });

  it('плохой срок попадает в errors с текстом из addWorkingDays', () => {
    const result = buildSchedule([order(1, '2025-03-06T10:00:00Z', -3), order(2, '2025-03-06T10:00:00Z', 1.5)], today);
    expect(result.errors, 'Отрицательный и дробный срок').toEqual([
      { id: 1, message: 'Срок должен быть целым числом дней не меньше нуля' },
      { id: 2, message: 'Срок должен быть целым числом дней не меньше нуля' },
    ]);
  });
});

describe('Пустой вход и чистота', () => {
  it('пустой список', () => {
    expect(buildSchedule([], new Date('2025-03-10T00:00:00Z')), 'Нет заказов').toEqual({ items: [], errors: [] });
  });

  it('входные данные не меняются', () => {
    const orders = [order(2, '2025-03-06T15:20:00Z', 2), order(1, '2025-03-03T09:00:00Z', 3)];
    const today = new Date('2025-03-10T15:00:00Z');
    const holidays = ['2025-03-08'];
    buildSchedule(orders, today, holidays);
    expect(orders.map((item) => item.id), 'Порядок заказов').toEqual([2, 1]);
    expect(today.toISOString(), 'Сегодняшняя дата').toBe('2025-03-10T15:00:00.000Z');
    expect(holidays, 'Праздники').toEqual(['2025-03-08']);
  });
});
