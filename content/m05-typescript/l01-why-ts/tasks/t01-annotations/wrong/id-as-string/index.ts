export const orderId: number = 1042;
export const customerName: string = "Анна Соколова";
export const isPaid: boolean = true;
export const itemPrices: number[] = [1200, 450, 89];
export const tags: string[] = ["хрупкое", "срочно"];

export function describeParcel(id: string, weightKg: number): string {
  return `Посылка №${id}, ${weightKg} кг`;
}
