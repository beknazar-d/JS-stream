// Баг: «копия» заказа — это тот же объект.
const original = { id: "A-101", status: "new" };
const preview = original;
preview.status = "cancelled";
console.log(original.status);
console.log(original === preview);

// Правильно: собрать новый объект.
const source = { id: "A-102", status: "new" };
const copy = { id: source.id, status: source.status };
copy.status = "cancelled";
console.log(source.status);
console.log(source === copy);

// Два одинаковых по виду объекта — разные объекты.
console.log({ id: 1 } === { id: 1 });
