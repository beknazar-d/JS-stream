// AbortController — пульт для отмены. Его signal передают в fetch.
const controller = new AbortController();
console.log('отменён: ' + controller.signal.aborted);

controller.signal.addEventListener('abort', () => console.log('сигнал получил abort'));
controller.abort();
console.log('отменён: ' + controller.signal.aborted);

// В catch отмену отличают от сбоя сети по имени ошибки.
function explain(error) {
  if (error.name === 'AbortError') return 'Сервер отвечает слишком долго';
  return 'Нет соединения с сервером';
}

console.log(explain(controller.signal.reason));
console.log(explain(new TypeError('Failed to fetch')));
