// Плюс склеивает, если рядом строка. Остальные операторы считают.
console.log("5" + 2);
console.log("5" - 2);
console.log("5" * "2");

// Number() превращает строку в число явно.
console.log(Number(" 7 "));
console.log(Number(""));
console.log(Number("12 шт"));

// NaN не равен даже самому себе.
console.log(NaN === NaN);
console.log(Number.isNaN(Number("12 шт")));

// Двойное равно приводит типы, тройное — нет.
console.log(0 == "");
console.log(0 === "");
