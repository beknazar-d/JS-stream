// Уровни заголовков страницы в порядке появления: 1 значит h1, 2 значит h2.
const levels = [1, 2, 4, 2, 3, 1, 3];

// Пропуск уровня: заголовок глубже предыдущего больше чем на один шаг.
function findJumps(list) {
  const jumps = [];
  for (let i = 1; i < list.length; i++) {
    if (list[i] - list[i - 1] > 1) {
      jumps.push("h" + list[i - 1] + " -> h" + list[i]);
    }
  }
  return jumps;
}

// Сколько h1 лишних: на странице должен быть один.
function extraH1(list) {
  const count = list.filter((level) => level === 1).length;
  return count > 1 ? count - 1 : 0;
}

console.log(levels.length);
console.log(findJumps(levels));
console.log(findJumps(levels).length);
console.log(extraH1(levels));
console.log(extraH1([1, 2, 3]));
