// Допишите типы после двоеточия: orderId: number = ...
export const orderId = 1042;
export const customerName = "Анна Соколова";
export const isPaid = true;
export const itemPrices = [1200, 450, 89];
export const tags = ["хрупкое", "срочно"];

export function describeParcel(id, weightKg) {
  return `Посылка №${id}, ${weightKg} кг`;
}
