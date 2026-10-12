interface Parcel {
  readonly id: number;
  weightKg: number;
  note?: string;
}

const parcel: Parcel = { id: 1, weightKg: 2 };
const copy = { ...parcel, weightKg: 5 };

(parcel as { id: number }).id = 99;

console.log(parcel.id);
console.log(copy.id);
console.log(parcel.note);
console.log(parcel.note ?? "без заметки");
console.log(Object.keys(copy).length);
console.log(JSON.stringify(parcel));
