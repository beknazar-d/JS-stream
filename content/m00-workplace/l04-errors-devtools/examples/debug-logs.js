// Отладка логами: печатаем значения на каждом шаге.
function shipping(weightKg, ratePerKg) {
  console.log("weightKg:", weightKg);
  console.log("ratePerKg:", ratePerKg);
  const cost = 150 + weightKg * ratePerKg;
  console.log("cost:", cost);
  return cost;
}

console.log("Итого:", shipping(2.5, 40));
console.log("Итого:", shipping(2.5));
