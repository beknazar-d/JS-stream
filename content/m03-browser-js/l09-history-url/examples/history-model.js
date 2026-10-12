// Модель истории: список записей и номер текущей.
const entries = [{ url: "/catalog", state: null }];
let index = 0;

function pushState(state, url) {
  entries.splice(index + 1); // всё, что было «впереди», стирается
  entries.push({ url, state });
  index = entries.length - 1;
}

function back() {
  if (index > 0) index -= 1;
  return entries[index]; // по этой записи сработает popstate
}

const show = () => console.log(index + " из " + (entries.length - 1) + ": " + entries[index].url);

pushState({ category: "kettles" }, "/catalog?category=kettles");
pushState({ category: "kettles", inStock: true }, "/catalog?category=kettles&inStock=1");
show();

const entry = back();
show();
console.log(JSON.stringify(entry.state));

// Новый выбор после «Назад» стирает «Вперёд».
pushState({ category: "blenders" }, "/catalog?category=blenders");
show();
console.log(entries.map((e) => e.url).join(" | "));
