import type { Address, Order } from './index.js';

type cases = [
  Expect<Equal<Address['city'], string>>,
  Expect<Equal<Address['street'], string>>,
  Expect<Equal<Address['apartment'], number | undefined>>,
  Expect<Equal<Order['id'], number>>,
  Expect<Equal<Order['customer'], string>>,
  Expect<Equal<Order['address'], Address>>,
  Expect<Equal<Order['paid'], boolean>>,
  Expect<Equal<Order['comment'], string | undefined>>,
];

// Необязательные поля можно не указывать.
const minimal: Order = { id: 1, customer: "Анна", address: { city: "Казань", street: "Баумана 5" }, paid: true };
const full: Order = { id: 2, customer: "Пётр", address: { city: "Пермь", street: "Мира 9", apartment: 3 }, paid: false, comment: "позвонить" };
