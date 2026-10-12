const raw = '{"id":"S-17","weightKg":"2.5"}';

const loose: any = JSON.parse(raw);
const safe: unknown = JSON.parse(raw);

// any: компилятор молчит, что бы мы ни написали.
console.log(typeof loose.weightKg);

// unknown: сначала проверяем, потом читаем.
console.log(typeof safe);
if (typeof safe === 'object' && safe !== null && 'weightKg' in safe) {
  console.log(typeof safe.weightKg);
}
