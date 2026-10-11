export function refundDecision(daysSincePurchase, isUsed, isBlocked) {
  if (!(daysSincePurchase >= 0)) {
    return "Некорректная дата покупки";
  }
  if (isBlocked) {
    return "Аккаунт заблокирован";
  }
  if (isUsed) {
    return "Товар использован";
  }
  if (daysSincePurchase >= 14) {
    return "Срок возврата истёк";
  }
  return "Возврат одобрен";
}
