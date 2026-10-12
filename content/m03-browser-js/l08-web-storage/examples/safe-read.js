// Безопасное чтение: битые данные не должны ронять страницу.
function readJson(raw, fallback) {
  try {
    const value = JSON.parse(raw);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

console.log(JSON.stringify(readJson('[{"id":1,"qty":2}]', [])));
console.log(JSON.stringify(readJson(null, [])));
console.log(JSON.stringify(readJson("{oops", [])));
console.log(JSON.stringify(readJson("[object Object]", [])));
console.log(JSON.stringify(readJson("", ["запас"])));

// Проверка формы: JSON корректен, но это не массив.
const data = readJson('{"id":1}', []);
console.log(Array.isArray(data));
