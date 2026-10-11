const order = {
  id: 7,
  created: new Date(Date.UTC(2025, 0, 15, 10)),
  note: undefined,
  total: NaN,
  print() {},
};

// undefined и функции пропали, NaN стал null, дата стала строкой.
const text = JSON.stringify(order);
console.log(text);

const back = JSON.parse(text);
console.log(typeof back.created);
console.log(back.created);

// Дату нужно создать заново.
const created = new Date(back.created);
console.log(created.getUTCHours());
