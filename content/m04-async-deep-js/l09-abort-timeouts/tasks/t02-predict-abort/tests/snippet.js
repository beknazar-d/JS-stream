const controller = new AbortController();
const { signal } = controller;
console.log(signal.aborted);
signal.addEventListener('abort', () => console.log('событие abort'));
const request = new Promise((resolve, reject) => {
  signal.addEventListener('abort', () => reject(signal.reason));
});
request.catch((error) => console.log(`отказ: ${error.name}`));
controller.abort();
console.log(signal.aborted);
console.log(signal.reason.name);
setTimeout(() => {
  controller.abort(new Error('поздно'));
  console.log(signal.reason.name);
}, 0);
console.log('конец');
