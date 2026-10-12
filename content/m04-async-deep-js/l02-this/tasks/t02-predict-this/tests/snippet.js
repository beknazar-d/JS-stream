'use strict';

const courier = {
  name: 'Иван',
  greet() {
    return 'Курьер ' + this.name;
  },
  greetLater() {
    return [1].map(() => this.name)[0];
  },
};

const copy = courier.greet;
const other = { name: 'Ольга', greet: courier.greet };
const bound = courier.greet.bind({ name: 'Пётр' });

console.log(courier.greet());
console.log(other.greet());
try {
  console.log(copy());
} catch (error) {
  console.log(error.name);
}
console.log(bound.call(courier));
console.log(courier.greetLater());
console.log(copy.call({ name: 'Анна' }));
