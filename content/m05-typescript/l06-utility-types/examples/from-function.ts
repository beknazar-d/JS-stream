function calcFee(zone: string, weightKg: number): number {
  return zone === "north" ? 120 + weightKg * 15 : 90 + weightKg * 10;
}

// Типы берём из самой функции: если её сигнатура изменится, они изменятся тоже.
type FeeArgs = Parameters<typeof calcFee>;
type Fee = ReturnType<typeof calcFee>;

const args: FeeArgs = ["north", 3];
const fee: Fee = calcFee(...args);
console.log(args);
console.log(fee);

// Pick берёт нужные поля, Readonly запрещает менять их после создания.
interface Courier {
  id: number;
  name: string;
  phone: string;
  zone: string;
}
type CourierCard = Readonly<Pick<Courier, "name" | "zone">>;

const card: CourierCard = { name: "Анна", zone: "Север" };
console.log(card);
