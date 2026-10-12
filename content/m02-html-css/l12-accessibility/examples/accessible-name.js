// Упрощённая модель: как браузер выбирает имя кнопки или поля.
// Настоящий алгоритм сложнее, но порядок такой.
function accessibleName(element) {
  if (element.ariaLabel) return element.ariaLabel;
  if (element.labelText) return element.labelText;
  if (element.text) return element.text;
  if (element.alt) return element.alt;
  return '';
}

const buttons = [
  { name: 'Кнопка с текстом', text: 'В корзину' },
  { name: 'Кнопка-значок без подписи', text: '' },
  { name: 'Кнопка-значок с aria-label', text: '', ariaLabel: 'Открыть корзину' },
  { name: 'Поле поиска с label', labelText: 'Поиск по магазину' },
  { name: 'Картинка с alt', alt: 'Чайник Домотека ЧЭ-17, белый' },
];

for (const element of buttons) {
  const result = accessibleName(element);
  console.log(element.name + ': ' + (result === '' ? '(без имени)' : result));
}
