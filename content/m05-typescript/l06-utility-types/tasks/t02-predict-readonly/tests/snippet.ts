// Карточка курьера и патч. Типы Readonly и Partial — только для компилятора.
interface Courier {
  name: string;
  zone: string;
  rating: number;
}

const base: Readonly<Courier> = { name: "Анна", zone: "Север", rating: 4.8 };
const patch: Partial<Courier> = { zone: "Юг" };
const merged: Courier = { ...base, ...patch };

console.log(merged);
console.log(base.zone);
console.log(Object.keys(patch).length);

const writable = base as Courier;
writable.rating = 5;
console.log(base.rating);

const frozen = Object.freeze({ ...base });
try {
  (frozen as Courier).rating = 1;
  console.log("записали");
} catch (error) {
  console.log(error instanceof TypeError);
}
console.log(frozen.rating);
