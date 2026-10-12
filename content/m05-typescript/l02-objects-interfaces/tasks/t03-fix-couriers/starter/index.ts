export interface Courier {
  readonly id: number;
  name: string;
  phone?: string;
  vehicle: string;
}

export const couriers: Courier[] = [
  { id: 1, name: "Иван Петров", phone: "+7 900 000-00-01", vehicle: "велосипед" },
  { id: 2, name: "Ольга Смирнова", phone: "+7 900 000-00-03" },
  { id: 3, name: "Пётр Лис", phon: "+7 900 000-00-02", vehicle: "авто" },
  { id: 4, name: "Мария Орлова", vehicle: "авто" },
];

export function contactLine(courier: Courier): string {
  return courier.name + ", тел.: " + courier.phone.trim();
}
