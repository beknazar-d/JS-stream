'use strict';
// this — это то, что стоит слева от точки в момент вызова.
const courier = {
  name: "Иван",
  greet() {
    return "Курьер " + this.name;
  },
};

console.log(courier.greet());

// Достали метод в переменную: слева от точки теперь ничего нет.
const detached = courier.greet;
try {
  console.log(detached());
} catch (error) {
  console.log(error.name + ": " + error.message);
}

// Положили тот же метод в другой объект: this стал другим.
const other = { name: "Ольга", greet: courier.greet };
console.log(other.greet());
