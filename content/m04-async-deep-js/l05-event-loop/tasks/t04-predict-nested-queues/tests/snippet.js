console.log("начало");

setTimeout(() => {
  console.log("таймер 1");
  Promise.resolve().then(() => console.log("then в таймере 1"));
}, 0);

setTimeout(() => console.log("таймер 2"), 0);

setTimeout(() => console.log("таймер 3 (20 мс)"), 20);

Promise.resolve()
  .then(() => {
    console.log("then 1");
    setTimeout(() => console.log("таймер из then"), 0);
  })
  .then(() => console.log("then 2"));

console.log("конец");
