// Два шага: адрес → фильтры и фильтры → адрес.
const CATEGORIES = ["all", "kettles", "blenders"];
const DEFAULTS = { category: "all", inStock: false };

function parseFilters(url) {
  const params = new URL(url, "https://domoteka.example").searchParams;
  const category = params.get("category");
  return {
    category: CATEGORIES.includes(category) ? category : DEFAULTS.category,
    inStock: params.get("inStock") === "1",
  };
}

function buildUrl(filters) {
  const params = new URLSearchParams();
  if (filters.category !== DEFAULTS.category) params.set("category", filters.category);
  if (filters.inStock) params.set("inStock", "1");
  const query = params.toString();
  return query ? "/catalog?" + query : "/catalog";
}

console.log(buildUrl({ category: "kettles", inStock: true }));
console.log(buildUrl(DEFAULTS));
console.log(JSON.stringify(parseFilters("/catalog?category=blenders")));
console.log(JSON.stringify(parseFilters("/catalog?category=toaster&inStock=0")));
// Круг: из фильтров в адрес и обратно.
const filters = { category: "kettles", inStock: true };
console.log(JSON.stringify(parseFilters(buildUrl(filters))) === JSON.stringify(filters));
