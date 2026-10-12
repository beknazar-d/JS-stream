export function averageMinutes(minutes: number[]): number {
  if (minutes.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const value of minutes) {
    sum = sum + value;
  }
  return Math.round((sum / minutes.length) * 10) / 10;
}

export function countPaid(flags: boolean[]): number {
  let paid = 0;
  for (const flag of flags) {
    if (flag) {
      paid = paid + 1;
    }
  }
  return paid;
}

export function formatPrice(amount: number, currency: string): string {
  return String(amount);
}
