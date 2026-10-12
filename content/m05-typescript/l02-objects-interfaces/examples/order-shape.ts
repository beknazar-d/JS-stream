interface Address {
  city: string;
  street: string;
  apartment?: number;      // необязательное свойство
}

interface Order {
  readonly id: number;     // менять после создания нельзя
  address: Address;        // вложенный тип
  comment?: string;
}

function label(order: Order): string {
  const { city, street, apartment } = order.address;
  const flat = apartment === undefined ? "" : `, кв. ${apartment}`;
  return `№${order.id}: ${city}, ${street}${flat}`;
}

const first: Order = { id: 1, address: { city: "Казань", street: "Баумана 5", apartment: 12 } };
const second: Order = { id: 2, address: { city: "Самара", street: "Ленина 1" }, comment: "позвонить" };

console.log(label(first));
console.log(label(second));
console.log(second.comment ?? "без комментария");
