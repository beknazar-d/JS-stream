interface Parcel {
  id: number;
  weightKg: number;
}

function describe(parcel: Parcel): string {
  return `Посылка ${parcel.id}: ${parcel.weightKg} кг`;
}

// Из переменной можно передать объект с лишними полями: важна форма.
const fromWarehouse = { id: 7, weightKg: 2.5, shelf: "B-12" };
console.log(describe(fromWarehouse));

// В рантайме лишнее поле никуда не делось.
console.log(fromWarehouse.shelf);

// А вот литерал, записанный прямо в вызове, проверяется строже
// и лишнее поле объявило бы ошибкой: describe({ id: 7, weightKg: 2.5, shelf: "B-12" })
console.log(describe({ id: 8, weightKg: 1 }));
