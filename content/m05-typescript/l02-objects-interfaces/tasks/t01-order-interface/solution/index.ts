export interface Address {
  city: string;
  street: string;
  apartment?: number;
}

export interface Order {
  readonly id: number;
  customer: string;
  address: Address;
  paid: boolean;
  comment?: string;
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
