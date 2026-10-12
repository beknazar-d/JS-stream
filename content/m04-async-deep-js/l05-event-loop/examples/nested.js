setTimeout(() => {
  console.log("таймер A");
  Promise.resolve().then(() => console.log("микрозадача внутри A"));
}, 0);

setTimeout(() => console.log("таймер B"), 0);

Promise.resolve().then(() => {
  console.log("микрозадача 1");
  queueMicrotask(() => console.log("микрозадача 2, добавлена из первой"));
});

console.log("синхронный код закончился");
