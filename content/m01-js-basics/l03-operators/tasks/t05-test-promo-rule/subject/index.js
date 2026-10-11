export function canApplyPromo(orderSum, isMember, usedBefore) {
  return orderSum >= 3000 && (isMember || orderSum >= 10000) && !usedBefore;
}
