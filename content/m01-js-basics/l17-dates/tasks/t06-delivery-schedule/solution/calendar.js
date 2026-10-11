// Готовые помощники из предыдущей задачи. Менять не нужно.

export function isWeekend(date) {
  const weekday = date.getUTCDay();
  return weekday === 0 || weekday === 6;
}

export function addWorkingDays(start, days, holidays = []) {
  if (!Number.isInteger(days) || days < 0) {
    throw new Error('Срок должен быть целым числом дней не меньше нуля');
  }

  const result = new Date(start);
  let counted = 0;
  while (counted < days) {
    result.setUTCDate(result.getUTCDate() + 1);
    const isHoliday = holidays.includes(result.toISOString().slice(0, 10));
    if (!isWeekend(result) && !isHoliday) {
      counted++;
    }
  }
  return result;
}
