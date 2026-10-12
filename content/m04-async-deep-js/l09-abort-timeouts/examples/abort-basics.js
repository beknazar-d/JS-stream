// Сигнал отмены: три факта в одном примере.
const controller = new AbortController();
const signal = controller.signal;

console.log('отменён до abort:', signal.aborted);
signal.addEventListener('abort', () => console.log('обработчик: нас отменили'));

controller.abort();
console.log('отменён после abort:', signal.aborted);
console.log('причина по умолчанию:', signal.reason.name);

// Второй abort ничего не меняет: сигнал отменяется один раз.
controller.abort(new Error('второй раз'));
console.log('причина после второго abort:', signal.reason.name);
