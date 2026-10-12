// Модель времени: когда уйдут запросы при четырёх попытках и паузе 1000 мс.
// Служба доставки каждый раз отвечает ошибкой 503 через 200 мс.
const attempts = 4;
const pauseMs = 1000;
const responseMs = 200;

let clock = 0;
for (let attempt = 1; attempt <= attempts; attempt++) {
  console.log(`попытка ${attempt}: запрос уходит в ${clock} мс`);
  clock += responseMs;
  if (attempt < attempts) {
    console.log(`  ошибка в ${clock} мс, пауза ${pauseMs} мс`);
    clock += pauseMs;
  }
}
console.log(`клиент получает ошибку в ${clock} мс`);
