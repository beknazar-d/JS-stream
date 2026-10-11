// Скрипт считает и печатает: числа считаются, строки склеиваются.
const processing = 12;
const shipped = 5;

console.log("В обработке:", processing);
console.log("Отгружено:", shipped);
console.log("Всего:", processing + shipped);
console.log("Остаток дня: " + (processing - shipped) + " шт.");
