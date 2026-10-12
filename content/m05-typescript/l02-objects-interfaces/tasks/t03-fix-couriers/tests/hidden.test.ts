import { couriers, contactLine } from './index.js';

describe('contactLine: курьер без телефона', () => {
  it('не падает и пишет «нет»', () => {
    const maria = couriers.find((c) => c.id === 4);
    expect(maria, 'Мария есть в списке').toBeDefined();
    expect(contactLine(maria!), 'Мария без телефона').toBe('Мария Орлова, тел.: нет');
  });
  it('курьер из переданного объекта', () => {
    expect(contactLine({ id: 9, name: 'Тест', vehicle: 'авто' }), 'Объект без телефона').toBe('Тест, тел.: нет');
  });
});

describe('Список курьеров целиком', () => {
  it('все четверо на месте', () => {
    expect(couriers.map((c) => c.name), 'Имена курьеров').toEqual(['Иван Петров', 'Ольга Смирнова', 'Пётр Лис', 'Мария Орлова']);
  });
  it('у каждого есть транспорт', () => {
    expect(couriers.every((c) => typeof c.vehicle === 'string' && c.vehicle.length > 0), 'Транспорт у всех').toBe(true);
  });
});
