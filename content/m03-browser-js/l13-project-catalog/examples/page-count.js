// Сколько страниц получится и что показывать на каждой.
const PAGE_SIZE = 6;

function pageInfo(total, page) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return {
    label: 'Страница ' + page + ' из ' + pages,
    prevDisabled: page <= 1,
    nextDisabled: page >= pages,
  };
}

console.log(pageInfo(24, 1));
console.log(pageInfo(24, 4));
console.log(pageInfo(8, 2));
console.log(pageInfo(0, 1));
