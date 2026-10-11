const d = new Date(Date.UTC(2025, 0, 31, 23, 30));
console.log(d.getUTCMonth());
console.log(d.toISOString());

const next = new Date(d);
next.setUTCDate(next.getUTCDate() + 1);
console.log(next.toISOString().slice(0, 10));

console.log(new Date(Date.UTC(2025, 1, 29)).toISOString().slice(0, 10));
console.log(new Date('2025-03-05T00:00:00Z') - new Date('2025-03-04T00:00:00Z'));
console.log(new Date('2025-03-05') === new Date('2025-03-05'));
console.log(new Date('2025-03-05').getTime() === new Date('2025-03-05').getTime());
console.log(Number.isNaN(new Date('abc').getTime()));
