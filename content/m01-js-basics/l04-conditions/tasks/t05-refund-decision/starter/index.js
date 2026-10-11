export function refundDecision(daysSincePurchase, isUsed, isBlocked) {
  let result;
  if (!isBlocked) {
    if (!isUsed) {
      if (daysSincePurchase <= 14) {
        result = "Возврат одобрен";
      } else {
        result = "Срок возврата истёк";
      }
    } else {
      result = "Товар использован";
    }
  } else {
    result = "Аккаунт заблокирован";
  }
  return result;
}
