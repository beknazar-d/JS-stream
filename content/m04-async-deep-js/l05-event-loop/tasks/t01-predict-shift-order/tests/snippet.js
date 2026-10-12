console.log("старт");

setTimeout(() => console.log("таймер"), 0);

queueMicrotask(() => console.log("журнал"));

Promise.resolve()
  .then(() => console.log("склад"))
  .then(() => console.log("курьер"));

console.log("конец");
