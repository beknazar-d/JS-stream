const DISCOUNTS = { SPRING: 10, VIP: 20 };

export function loadDiscount(code, onReady) {
  setTimeout(() => {
    onReady(DISCOUNTS[code]);
  }, 0);
}
