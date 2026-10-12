// Ограничение: подойдёт любой тип, у которого есть числовой id.
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const parcels = [
  { id: 7, weightKg: 2.5, status: "shipped" },
  { id: 9, weightKg: 11, status: "new" },
];
const couriers = [{ id: 1, name: "Анна" }];

const parcel = findById(parcels, 9);
const courier = findById(couriers, 1);

console.log(parcel?.status);
console.log(courier?.name);
console.log(findById(couriers, 5));
