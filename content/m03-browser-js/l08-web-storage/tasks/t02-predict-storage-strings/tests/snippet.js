// Упрощённая модель Storage: значения всегда превращаются в строки.
const storage = {
  data: new Map(),
  setItem(key, value) {
    this.data.set(key, String(value));
  },
  getItem(key) {
    return this.data.has(key) ? this.data.get(key) : null;
  },
};

storage.setItem('qty', 3);
console.log(typeof storage.getItem('qty'));
console.log(storage.getItem('qty') + 1);

storage.setItem('ids', [4, 7]);
console.log(storage.getItem('ids'));

storage.setItem('user', { name: 'Анна' });
console.log(storage.getItem('user'));

console.log(storage.getItem('coupon'));

storage.setItem('filters', JSON.stringify({ brand: 'Bosch', inStock: true }));
console.log(JSON.parse(storage.getItem('filters')).inStock);
