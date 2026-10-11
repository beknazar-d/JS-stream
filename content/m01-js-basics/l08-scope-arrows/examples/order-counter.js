// Каждый счётчик помнит свою переменную current, даже после выхода из createOrderCounter.
function createOrderCounter(startFrom) {
  let current = startFrom - 1;
  return () => {
    current++;
    return current;
  };
}

const nextWebOrder = createOrderCounter(1000);
const nextShopOrder = createOrderCounter(5000);

console.log(nextWebOrder());
console.log(nextWebOrder());
console.log(nextShopOrder());
console.log(nextWebOrder());
