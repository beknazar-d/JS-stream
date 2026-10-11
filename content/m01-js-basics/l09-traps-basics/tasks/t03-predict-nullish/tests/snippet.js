const stockFromForm = 0;
console.log(stockFromForm || 10);
console.log(stockFromForm ?? 10);

const note = "";
console.log(note || "нет заметки");
console.log(`[${note ?? "нет заметки"}]`);

let discount;
console.log(discount ?? 15);
console.log(null ?? undefined ?? 7);
console.log(NaN ?? 1);
console.log(false || null || "запасной");
