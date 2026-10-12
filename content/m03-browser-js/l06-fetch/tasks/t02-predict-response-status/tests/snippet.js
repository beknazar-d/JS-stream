const found = new Response('[]', { status: 200 });
const created = new Response('{"id": 1042}', { status: 201 });
const missing = new Response('{"error": "Нет такого товара"}', { status: 404 });
const down = new Response('', { status: 503 });
const empty = new Response(null, { status: 204 });

console.log(found.status + ' ' + found.ok);
console.log(created.status + ' ' + created.ok);
console.log(missing.status + ' ' + missing.ok);
console.log(down.status + ' ' + down.ok);
console.log(String(empty.ok));
console.log(JSON.parse('{"id": 1042}').id + 1);
console.log('sku=' + encodeURIComponent('K-200 & B-50'));

try {
  JSON.parse('<h1>Ошибка сервера</h1>');
  console.log('разобрано');
} catch (error) {
  console.log('ошибка: ' + error.name);
}

async function load() {
  console.log('load: начало');
  return 5;
}
const result = load();
console.log('после вызова: ' + (result instanceof Promise));
