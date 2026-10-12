type Parcel = { id: number; weightKg: number };

const fromApi = JSON.parse('{"id": "A-17", "weightKg": "2.5"}') as Parcel;

console.log(typeof fromApi.id);
console.log(fromApi.weightKg * 2);
console.log(fromApi.weightKg + 2);
const checked: unknown = fromApi.id;
console.log(typeof checked === "number");
console.log(Number(fromApi.weightKg) + 2);
console.log(Number.isNaN(Number(fromApi.id)));
