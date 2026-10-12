// Строим классы по БЭМ: блок, элемент, модификатор.
function bem(block, element, modifiers = {}) {
  const base = element ? block + '__' + element : block;
  const classes = [base];
  for (const [name, value] of Object.entries(modifiers)) {
    if (value === false || value === null || value === undefined || value === '') continue;
    classes.push(value === true ? base + '--' + name : base + '--' + name + '-' + value);
  }
  return classes.join(' ');
}

console.log(bem('product-card'));
console.log(bem('product-card', 'title'));
console.log(bem('product-card', null, { sale: true }));
console.log(bem('btn', null, { size: 'small', primary: true, disabled: false }));
console.log(bem('product-card', 'price', { old: true }));
