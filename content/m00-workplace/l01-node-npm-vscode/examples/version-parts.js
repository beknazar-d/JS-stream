// Вывод команды node -v — это просто строка. Её можно разобрать на части.
const output = "v22.22.0\n";

const clean = output.trim();
console.log(clean);

const withoutV = clean.slice(1);
console.log(withoutV);

const parts = withoutV.split(".");
console.log(parts[0]);
console.log(Number(parts[0]) + 1);
