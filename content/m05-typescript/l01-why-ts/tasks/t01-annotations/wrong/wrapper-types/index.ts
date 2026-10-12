export const orderId: Number = 1042;
export const customerName: String = "Анна Соколова";
export const isPaid: Boolean = true;
export const itemPrices: Number[] = [1200, 450, 89];
export const tags: String[] = ["хрупкое", "срочно"];

export function describeParcel(id: Number, weightKg: Number): String {
  return `Посылка №${id}, ${weightKg} кг`;
}
