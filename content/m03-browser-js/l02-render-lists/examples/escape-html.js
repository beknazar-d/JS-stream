// Что делает textContent: символы разметки становятся обычным текстом.
function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

console.log(escapeHtml('Хлеб & соль'));
console.log(escapeHtml('<b>Скидка</b>'));
console.log(escapeHtml('<img src=x onerror="steal()">'));
