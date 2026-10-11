export function buildInstallmentPlan(price, months) {
  const rest = price % months;
  const base = (price - rest) / months;

  let plan = '';
  for (let month = 1; month <= months; month++) {
    const amount = month === months ? base + rest : base;
    plan += `Месяц ${month}: ${amount} руб.\n`;
  }
  return plan + `Итого: ${price} руб.`;
}
