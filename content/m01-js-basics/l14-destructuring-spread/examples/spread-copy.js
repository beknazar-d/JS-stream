const order = { id: 1042, status: 'new', total: 3600 };

// Копия с изменением: поле после ...order перезаписывает старое.
const paid = { ...order, status: 'paid' };
console.log(order);
console.log(paid);

// Spread в массиве: новый массив, старый не тронут.
const lines = ['кофе', 'фильтры'];
const withMug = [...lines, 'кружка'];
console.log(withMug, lines.length);

// Rest-параметр: сколько бы цен ни передали, они придут массивом.
function sum(...prices) {
  let result = 0;
  for (const price of prices) {
    result += price;
  }
  return result;
}
console.log(sum(1200, 300, 450));
console.log(sum());
