// Экранирование: опасные символы заменяются безопасными кодами.
function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function reviewHtml(author, text) {
  return '<li><b>' + escapeHtml(author) + '</b>: ' + escapeHtml(text) + '</li>';
}

function countTags(html) {
  return (html.match(/<[a-z]/g) || []).length;
}

console.log(escapeHtml('Хлеб & соль'));
console.log(escapeHtml('5 < 7'));
console.log(escapeHtml('<b>Скидка</b>'));
console.log(escapeHtml('&lt;'));

const html = reviewHtml('Олег', '<i>Супер</i>');
console.log(html);
console.log(countTags(html));
console.log(countTags(reviewHtml('Олег', 'Супер')));
