const order = {
  id: 7,
  paid: false,
  note: undefined,
  total: NaN,
  created: new Date(Date.UTC(2025, 0, 15, 10)),
  tags: ['a', undefined],
};

console.log(JSON.stringify(order));
console.log(JSON.parse('{"qty":"3"}').qty + 1);
console.log(typeof JSON.parse(JSON.stringify(order)).created);
console.log(JSON.parse('[1,"2",null]'));
console.log(JSON.stringify('кофе'));
console.log(JSON.stringify(undefined));
console.log(JSON.stringify({ price: 0.1 + 0.2 }));
