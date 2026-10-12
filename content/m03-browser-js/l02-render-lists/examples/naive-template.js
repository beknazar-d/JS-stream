// Строка, которую innerHTML превратит в элементы.
function reviewHtml(author, text) {
  return '<li><b>' + author + '</b>: ' + text + '</li>';
}

// Сколько тегов браузер найдёт в строке.
function countTags(html) {
  return (html.match(/<[a-z]/g) || []).length;
}

const honest = reviewHtml('Анна', 'Чайник отличный');
const hostile = reviewHtml('<img src=x onerror="steal()">', 'Чайник отличный');

console.log(honest);
console.log(countTags(honest));
console.log(hostile);
console.log(countTags(hostile));
