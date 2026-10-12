// Функция с async всегда возвращает обещание (Promise), а не готовое значение.
async function loadTitle() {
  console.log('внутри: начало');
  return 'Чайник K-200';
}

const promise = loadTitle();
console.log('снаружи это обещание: ' + (promise instanceof Promise));
console.log('если забыть await, на странице окажется: ' + promise);
