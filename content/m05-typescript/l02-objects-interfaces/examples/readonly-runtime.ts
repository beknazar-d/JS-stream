interface Limits {
  readonly maxWeightKg: number;
}

const limits: Limits = { maxWeightKg: 30 };
// limits.maxWeightKg = 50;   // ошибка типов: свойство только для чтения

// readonly существует только для компилятора. Через приведение типа его обходят.
(limits as { maxWeightKg: number }).maxWeightKg = 50;
console.log(limits.maxWeightKg);

// Настоящая защита в рантайме — Object.freeze.
const frozen = Object.freeze({ maxWeightKg: 30 });
console.log(Object.isFrozen(frozen));
