// Рассрочка: 12 000 рублей на 4 месяца, платёж одинаковый.
const price = 12000;
const months = 4;
const payment = price / months;

for (let month = 1; month <= months; month++) {
  const left = price - payment * month;
  console.log(`Месяц ${month}: платёж ${payment}, осталось ${left}`);
}
console.log("Долг закрыт");
