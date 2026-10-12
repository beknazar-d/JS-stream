// Причина отмены и throwIfAborted: отмена превращается в обычную ошибку.
const closed = new AbortController();
closed.abort(new Error('Клиент закрыл страницу'));

try {
  closed.signal.throwIfAborted();
} catch (error) {
  console.log('своя причина:', error.message);
}

const plain = new AbortController();
plain.abort();

try {
  plain.signal.throwIfAborted();
} catch (error) {
  console.log('причина по умолчанию:', error.name, '-', error.message);
}
