export function reindexCatalog(products, indexProduct, chunkSize = 100) {
  return new Promise((resolve, reject) => {
    let position = 0;

    function runChunk() {
      try {
        const end = Math.min(position + chunkSize, products.length);
        for (; position < end; position++) {
          indexProduct(products[position]);
        }
      } catch (error) {
        reject(error);
        return;
      }
      if (position < products.length) {
        Promise.resolve().then(runChunk);
      } else {
        resolve(position);
      }
    }

    runChunk();
  });
}
