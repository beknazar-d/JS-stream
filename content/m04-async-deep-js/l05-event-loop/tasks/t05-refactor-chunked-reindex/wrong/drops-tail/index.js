export function reindexCatalog(products, indexProduct, chunkSize = 100) {
  return new Promise((resolve, reject) => {
    let position = 0;

    function runChunk() {
      try {
        const end = position + chunkSize;
        for (; position < end; position++) {
          indexProduct(products[position]);
        }
      } catch (error) {
        reject(error);
        return;
      }
      if (position + chunkSize <= products.length) {
        setTimeout(runChunk, 0);
      } else {
        resolve(position);
      }
    }

    if (products.length >= chunkSize) runChunk();
    else resolve(0);
  });
}
