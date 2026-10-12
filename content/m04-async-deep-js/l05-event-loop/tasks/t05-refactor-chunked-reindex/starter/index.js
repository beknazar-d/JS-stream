// Сейчас функция обрабатывает весь каталог одним циклом и блокирует поток.
export function reindexCatalog(products, indexProduct) {
  let done = 0;
  for (const product of products) {
    indexProduct(product);
    done += 1;
  }
  return done;
}
