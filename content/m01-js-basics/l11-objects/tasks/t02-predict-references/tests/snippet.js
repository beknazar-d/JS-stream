const first = { id: "A-101", status: "new" };
const second = first;
second.status = "paid";

console.log(first.status);
console.log(first === second);
console.log({ id: 1 } === { id: 1 });

const copy = { id: first.id, status: first.status };
copy.status = "shipped";
console.log(first.status);
console.log(Object.keys(first));
console.log(first.customer?.address);
console.log(Object.hasOwn(first, "total"));
