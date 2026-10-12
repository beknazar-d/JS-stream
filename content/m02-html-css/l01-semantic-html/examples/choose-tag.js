// Что поставить: кнопку или ссылку?
function chooseTag(element) {
  if (element.goesToAddress) {
    return "a";
  }
  return "button";
}

const elements = [
  { name: "Добавить в корзину", goesToAddress: false },
  { name: "Вернуться в каталог", goesToAddress: true },
  { name: "Показать характеристики", goesToAddress: false },
  { name: "Условия доставки", goesToAddress: true },
];

for (const element of elements) {
  console.log(element.name + " -> " + chooseTag(element));
}
