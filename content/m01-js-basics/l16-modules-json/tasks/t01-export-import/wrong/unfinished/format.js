export const CURRENCY = 'RUB';

export default function formatRub(amount) {
  return `${amount} ₽`;
}

export function formatQty(qty) {
  return `${qty} шт.`;
}
