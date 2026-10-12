// Общие помощники тестов панели остатков.
export const tableRows = () => $$('#rows tr');
export const digits = (text) => Number(text.replace(/[^\d.-]/g, ''));

export function readTable() {
  return tableRows().map((tr) => ({
    name: tr.querySelector('.name').textContent,
    qty: Number(tr.querySelector('.qty').textContent),
    price: digits(tr.querySelector('.price').textContent),
  }));
}

export function expectedTotals() {
  const items = readTable();
  return {
    qty: items.reduce((sum, item) => sum + item.qty, 0),
    sum: items.reduce((sum, item) => sum + item.qty * item.price, 0),
  };
}

export async function fill(name, qty, price) {
  await type('#name', name);
  await type('#qty', qty);
  await type('#price', price);
  await submit('#add-form');
}
