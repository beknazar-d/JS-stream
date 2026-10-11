// Сравнение, плюс и NaN: где язык молча приводит типы.
console.log(0 == "");
console.log(0 === "");
console.log("0" == false);
console.log(null == undefined);
console.log(null === undefined);

console.log("2" + 3);
console.log("2" - 3);

console.log("10" < "9");
console.log(Number("10") < Number("9"));

const parsed = Number("12px");
console.log(parsed === NaN);
console.log(Number.isNaN(parsed));
