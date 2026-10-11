const created = new Date('2025-03-05T10:00:00Z');
const delivered = new Date('2025-03-08T09:30:00Z');

// Две даты это два объекта: === сравнивает ссылки.
console.log(new Date('2025-03-05T10:00:00Z') === created);
console.log(new Date('2025-03-05T10:00:00Z').getTime() === created.getTime());

// < и > работают, потому что дата превращается в число.
console.log(created < delivered);

// Вычитание даёт миллисекунды.
const ms = delivered - created;
console.log(ms);
console.log(ms / (24 * 60 * 60 * 1000));

// Целые дни между календарными днями: сначала отбросьте время.
const day = (date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
console.log((day(delivered) - day(created)) / (24 * 60 * 60 * 1000));

// Плохая строка даёт Invalid Date, а его время равно NaN.
console.log(Number.isNaN(new Date('вчера').getTime()));
