// Стоимость доставки: база 200 рублей, 40 рублей за килограмм, далёкие адреса дороже.
function shippingCost(weightKg, distanceKm) {
  const base = 200;
  const weightFee = weightKg * 40;
  const distanceFee = distanceKm > 100 ? 300 : 0;
  return base + weightFee + distanceFee;
}

console.log(shippingCost(2, 50));
console.log(shippingCost(5, 250));

const cost = shippingCost(1, 10);
console.log(`Доставка: ${cost} руб.`);

// Функцию можно положить в другую переменную: это такое же значение, как число.
const calculate = shippingCost;
console.log(typeof shippingCost);
console.log(calculate(3, 20));
