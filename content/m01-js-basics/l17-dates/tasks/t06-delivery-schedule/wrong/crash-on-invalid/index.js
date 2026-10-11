import { addWorkingDays } from './calendar.js';

const DAY = 24 * 60 * 60 * 1000;

const labelFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const utcMidnight = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

export function buildSchedule(orders, today, holidays = []) {
  const items = [];
  const errors = [];
  const todayStart = utcMidnight(today);

  for (const order of orders) {
    const created = new Date(order.createdAt);
    let deliverBy;
    try {
      deliverBy = addWorkingDays(utcMidnight(created), order.days, holidays);
    } catch (error) {
      errors.push({ id: order.id, message: error.message });
      continue;
    }

    const daysLeft = Math.round((deliverBy.getTime() - todayStart.getTime()) / DAY);
    items.push({
      id: order.id,
      deliverBy: deliverBy.toISOString().slice(0, 10),
      label: labelFormat.format(deliverBy),
      daysLeft,
      late: daysLeft < 0,
    });
  }

  items.sort((a, b) => {
    if (a.deliverBy !== b.deliverBy) {
      return a.deliverBy < b.deliverBy ? -1 : 1;
    }
    return a.id - b.id;
  });

  return { items, errors };
}
