console.log("1. заказ принят");

setTimeout(() => console.log("4. письмо клиенту (таймер)"), 0);

Promise.resolve().then(() => console.log("3. запись в журнал (микрозадача)"));

console.log("2. ответ покупателю");
