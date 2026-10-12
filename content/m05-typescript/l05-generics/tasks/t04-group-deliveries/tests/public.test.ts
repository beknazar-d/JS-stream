import { groupBy } from './index.js';

const deliveries = [
  { id: 1, courier: 'Анна', address: 'Ленина, 5' },
  { id: 2, courier: 'Борис', address: 'Мира, 12' },
  { id: 3, courier: 'Анна', address: 'Гагарина, 7' },
  { id: 4, courier: 'Анна', address: 'Садовая, 1' },
];

describe('groupBy', () => {
  it('собирает все доставки курьера в одну группу', () => {
    const grouped = groupBy(deliveries, (delivery: { courier: string }) => delivery.courier);
    expect(grouped['Анна'].map((d: { id: number }) => d.id), 'Доставки Анны по порядку').toEqual([1, 3, 4]);
    expect(grouped['Борис'].map((d: { id: number }) => d.id), 'Доставки Бориса').toEqual([2]);
  });

  it('пустой список даёт пустой объект', () => {
    expect(groupBy([], () => 'любой'), 'Пустой список').toEqual({});
  });
});
