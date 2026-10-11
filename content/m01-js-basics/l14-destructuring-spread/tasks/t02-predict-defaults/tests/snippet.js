const order = { id: 7, status: 'new', coupon: null, note: undefined };
const { status = 'draft', coupon = 'NONE', note = 'нет', total = 0 } = order;

console.log(status);
console.log(coupon);
console.log(note);
console.log(total);

const copy = { ...order, status: 'paid' };
console.log(copy.status, order.status);

const [first, ...others] = [10, 20, 30];
console.log(others);

const base = { id: 8, address: { city: 'Казань' } };
const baseCopy = { ...base };
baseCopy.address.city = 'Самара';
console.log(base.address.city);
