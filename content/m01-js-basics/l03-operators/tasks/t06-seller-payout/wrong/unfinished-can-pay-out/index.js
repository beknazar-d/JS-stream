export function sellerPayout(saleKopecks, commissionPercent, bonusKopecks) {
  const percent = commissionPercent ?? 10;
  const bonus = bonusKopecks ?? 0;
  const commission = Math.round((saleKopecks * percent) / 100);
  return saleKopecks - commission + bonus;
}

export function canPayOut(payoutKopecks, isWeekend, isBlocked) {
  // ваш код
}
