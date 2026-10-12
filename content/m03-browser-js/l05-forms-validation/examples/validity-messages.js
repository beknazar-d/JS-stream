// В браузере у поля есть объект validity с флагами причин.
// Здесь он заменён обычным объектом, чтобы увидеть логику выбора сообщения.
const MESSAGES = {
  valueMissing: 'Введите почту, чтобы мы прислали чек',
  typeMismatch: 'Почта должна выглядеть так: name@example.com',
};

function messageFor(validity) {
  for (const [reason, text] of Object.entries(MESSAGES)) {
    if (validity[reason]) return text;
  }
  return '';
}

console.log('[' + messageFor({ valueMissing: true }) + ']');
console.log('[' + messageFor({ typeMismatch: true }) + ']');
console.log('[' + messageFor({}) + ']');
