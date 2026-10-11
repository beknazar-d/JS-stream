import { isExpired } from './index.js';

const DAY = 24 * 60 * 60 * 1000;
const isoDay = (date) => date.toISOString().slice(0, 10);

describe('isExpired', () => {
  it('завтрашний срок не истёк', () => {
    const now = new Date();
    expect(isExpired(isoDay(new Date(now.getTime() + DAY)), now), 'Срок завтра').toBe(false);
  });

  it('вчерашний срок истёк', () => {
    const now = new Date();
    expect(isExpired(isoDay(new Date(now.getTime() - DAY)), now), 'Срок вчера').toBe(true);
  });

  it('плохая дата', () => {
    expect(() => isExpired('abc', new Date()), 'Текст «abc»').toThrow('Некорректная дата окончания');
  });
});
