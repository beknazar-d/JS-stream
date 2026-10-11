const processing = 12;
const shipped = 5;
const returned = 2;

console.log("Отчёт склада");
console.log("В обработке: " + processing);
console.log("Отгружено: " + shipped);
console.Log("Возвраты: " + returned);
console.log("Всего движений:" + (processing + shipped + returned));
