// fetch не считает ошибкой ответ 404 или 503: сервер ведь ответил.
// Успешен ли ответ, решаем мы по response.ok и response.status.
function describe(response) {
  if (response.ok) return 'успех';
  if (response.status === 404) return 'не найдено';
  if (response.status >= 500) return 'сервер недоступен';
  return 'ошибка запроса';
}

for (const status of [200, 201, 204, 400, 404, 503]) {
  const body = status === 204 ? null : '';
  const response = new Response(body, { status });
  console.log(status + ': ' + describe(response));
}
