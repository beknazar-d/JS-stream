const DISCOUNTS = { SPRING: 10, VIP: 20 };

export function loadDiscount(code, onReady) {
  let percent = 0;
  setTimeout(() => {
    percent = DISCOUNTS[code] ?? 0;
    onReady(percent);
  }, 0);
  onReady(percent);
}
