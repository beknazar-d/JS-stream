const orders = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));

function processChunk(from, size) {
  const part = orders.slice(from, from + size);
  console.log("обработаны заказы " + part.map((o) => o.id).join(", "));
  if (from + size < orders.length) {
    setTimeout(() => processChunk(from + size, size), 0);
  } else {
    console.log("готово");
  }
}

setTimeout(() => console.log("страница успела откликнуться"), 0);
processChunk(0, 4);
