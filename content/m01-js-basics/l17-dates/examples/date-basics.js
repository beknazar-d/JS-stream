// Месяцы считаются с нуля: 0 это январь, 2 это март.
const march5 = new Date(Date.UTC(2025, 2, 5));
console.log(march5.toISOString());
console.log(march5.getUTCMonth());
console.log(march5.getUTCDate());
console.log(march5.getUTCDay());

// Несуществующий день переносится на следующий месяц.
console.log(new Date(Date.UTC(2025, 1, 29)).toISOString());

// Прибавить дни: setUTCDate сам переходит через границу месяца.
const deadline = new Date(Date.UTC(2025, 0, 31));
deadline.setUTCDate(deadline.getUTCDate() + 1);
console.log(deadline.toISOString().slice(0, 10));
