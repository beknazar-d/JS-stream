// Нестабильный сервер: сначала 503, потом 200. Так же настроены мок-API в заданиях.
const statuses = [503, 200];
let calls = 0;

function fakeRequest() {
  const status = statuses[Math.min(calls, statuses.length - 1)];
  calls++;
  return status;
}

for (let attempt = 1; attempt <= 3; attempt++) {
  const status = fakeRequest();
  const ok = status >= 200 && status < 300;
  console.log('Попытка ' + attempt + ': ' + status + (ok ? ' — успех' : ' — ошибка, нужна кнопка «Повторить»'));
}
