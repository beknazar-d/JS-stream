// Адрес — это объект с частями. Создаём из строки и читаем.
const url = new URL("https://domoteka.example/catalog?category=kettles&sort=price-asc#reviews");

console.log(url.pathname);
console.log(url.search);
console.log(url.hash);
console.log(url.searchParams.get("sort"));

// Параметры можно менять: адрес пересоберётся сам.
url.searchParams.set("inStock", "1");
url.searchParams.delete("sort");
console.log(url.search);

// Пробелы, амперсанды и русские буквы кодируются автоматически.
const params = new URLSearchParams();
params.set("q", "кофе & чай");
console.log(params.toString());
console.log(params.get("q"));
