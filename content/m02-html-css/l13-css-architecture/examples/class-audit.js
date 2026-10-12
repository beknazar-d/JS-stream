// Проверка имён классов на соответствие БЭМ: блок, блок__элемент, блок--модификатор.
const name = '[a-z][a-z0-9]*(?:-[a-z0-9]+)*';
const pattern = new RegExp('^' + name + '(?:__' + name + ')?(?:--' + name + ')?$');

function audit(className) {
  if (className.includes('__') && className.split('__').length > 2) return 'элемент внутри элемента';
  if (/[A-Z]/.test(className)) return 'заглавные буквы';
  if (!pattern.test(className)) return 'не по шаблону';
  return 'ok';
}

const classes = [
  'product-card',
  'product-card__title',
  'product-card--sale',
  'product-card__price--old',
  'productCard',
  'product-card__title__icon',
  'card_title',
];

for (const className of classes) {
  console.log(className + ': ' + audit(className));
}
