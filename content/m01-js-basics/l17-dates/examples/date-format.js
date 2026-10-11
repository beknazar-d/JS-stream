const date = new Date(Date.UTC(2025, 2, 5, 14, 30));

const short = new Intl.DateTimeFormat('ru-RU', { timeZone: 'UTC' });
console.log(short.format(date));

const long = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
console.log(long.format(date));

const time = new Intl.DateTimeFormat('ru-RU', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
console.log(time.format(date));

// Тот же момент по московскому времени.
const moscow = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit' });
console.log(moscow.format(date));
