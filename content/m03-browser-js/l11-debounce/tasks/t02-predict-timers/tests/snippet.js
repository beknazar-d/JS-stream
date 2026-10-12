let timer;

function onInput(text) {
  clearTimeout(timer);
  timer = setTimeout(() => console.log('поиск: ' + text), 10);
  console.log('ввод: ' + text);
}

onInput('ч');
onInput('чай');
setTimeout(() => console.log('нулевая задержка'), 0);
setTimeout(() => onInput('чайник'), 30);
console.log('конец скрипта');
