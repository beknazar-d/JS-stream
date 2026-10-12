// removeEventListener работает только с той же самой функцией.
function createTarget() {
  const listeners = [];
  return {
    add(fn) {
      listeners.push(fn);
    },
    remove(fn) {
      const index = listeners.indexOf(fn);
      if (index !== -1) listeners.splice(index, 1);
    },
    count() {
      return listeners.length;
    },
  };
}

const first = createTarget();
first.add(() => console.log('привет'));
first.remove(() => console.log('привет'));
console.log('две одинаковые записи — разные функции, осталось: ' + first.count());

function hello() {
  console.log('привет');
}
const second = createTarget();
second.add(hello);
second.remove(hello);
console.log('одна и та же функция, осталось: ' + second.count());
