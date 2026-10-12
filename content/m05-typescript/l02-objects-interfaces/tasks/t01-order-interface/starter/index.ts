export interface Address {
  // ваш код
}

export interface Order {
  // ваш код
}

export const sample: Order = {
  id: 1042,
  customer: "Анна Соколова",
  address: { city: "Казань", street: "Баумана 5", apartment: 12 },
  paid: false,
};

export function cityOf(order: Order): string {
  return order.address.city;
}
