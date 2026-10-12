export function bindAll(obj) {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    if (typeof result[key] === 'function') {
      result[key] = result[key].bind(result);
    }
  }
  return result;
}
