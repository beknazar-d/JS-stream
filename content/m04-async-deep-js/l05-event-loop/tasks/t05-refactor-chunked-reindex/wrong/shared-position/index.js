let position = 0;

export function reindexCatalog(products, indexProduct, chunkSize = 100) {
  position = 0;
  return new Promise((resolve, reject) => {
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
        setTimeout(runChunk, 0);
      } else {
        resolve(position);
      }
    }

    runChunk();
  });
}
