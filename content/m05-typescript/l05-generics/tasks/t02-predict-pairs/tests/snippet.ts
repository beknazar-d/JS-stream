// Маршрутный лист: пара «код склада и вес партии».
function pair<A, B>(left: A, right: B): [A, B] {
  return [left, right];
}

function swap<A, B>(entry: [A, B]): [B, A] {
  return [entry[1], entry[0]];
}

const route = pair("MSK-01", 42);
console.log(route);
console.log(swap(route));
console.log(typeof swap(route)[0]);
console.log(pair<string, number>("SPB-02", 7).length);
console.log(pair(null, undefined));
console.log(route === swap(swap(route)));
