export function bem(block, element) {
  if (typeof block !== 'string' || block === '') {
    throw new Error('Нужно имя блока');
  }
  return element ? block + '__' + element : block;
}
