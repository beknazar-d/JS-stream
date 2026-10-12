// Типы выводятся из значений. Аннотации здесь не нужны.
const city = "Казань";            // тип "Казань": const не меняется
let courier = "Иван";             // тип string: let можно перезаписать
const prices = [120, 80, 45];     // тип number[]

const total = prices.reduce((sum, price) => sum + price, 0);
console.log(city, courier, total);

courier = courier.toUpperCase();  // у string есть toUpperCase
console.log(courier);

// Аннотация нужна там, где выводить не из чего: у параметров.
function addVat(amount: number, rate: number): number {
  return amount * (1 + rate);
}
console.log(addVat(1000, 0.2));
