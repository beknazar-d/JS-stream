export function sellerPayout(saleKopecks, commissionPercent, bonusKopecks) {
  const percent = commissionPercent ?? 10;
  const commission = Math.round((saleKopecks * percent) / 100);
  return saleKopecks - commission + bonusKopecks;
}

export function canPayOut(payoutKopecks, isWeekend, isBlocked) {
  return payoutKopecks >= 100000 && !isWeekend && !isBlocked;
}
