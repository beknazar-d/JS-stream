export function averageMinutes(minutes: any): any {
  if (minutes.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const value of minutes) {
    sum = sum + value;
  }
  return Math.round((sum / minutes.length) * 10) / 10;
}

export function countPaid(flags: any): any {
  let paid = 0;
  for (const flag of flags) {
    if (flag) {
      paid = paid + 1;
    }
  }
  return paid;
}

export function formatPrice(amount: any, currency: any): any {
  return amount.toFixed(2) + " " + currency;
}
