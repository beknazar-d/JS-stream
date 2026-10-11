// Форматирование для всего сайта. Сделайте функции доступными другим файлам.
// formatRub — главный экспорт файла (по умолчанию).
// formatQty и CURRENCY — именованные экспорты.

const CURRENCY = 'RUB';

function formatRub(amount) {
  return `${amount} ₽`;
}

function formatQty(qty) {
  return `${qty} шт.`;
}
