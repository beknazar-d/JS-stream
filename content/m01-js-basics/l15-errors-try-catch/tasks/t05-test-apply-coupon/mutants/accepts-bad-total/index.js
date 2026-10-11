export function applyCoupon(total, code) {
  if (code === 'SALE10') {
    return Math.round(total * 0.9);
  }
  if (code === 'MINUS500') {
    return Math.max(total - 500, 0);
  }
  throw new Error(`Неизвестный промокод: ${code}`);
}
