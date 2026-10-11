export function bem(block, element, modifiers) {
  if (typeof block !== 'string' || block === '') {
    throw new Error('Нужно имя блока');
  }
  const base = element ? block + '__' + element : block;
  const classes = [];
  for (const [name, value] of Object.entries(modifiers ?? {})) {
    if (value === false || value === null || value === undefined || value === '') {
      continue;
    }
    classes.push(value === true ? base + '--' + name : base + '--' + name + '-' + value);
  }
  return classes.length ? classes.join(' ') : base;
}
