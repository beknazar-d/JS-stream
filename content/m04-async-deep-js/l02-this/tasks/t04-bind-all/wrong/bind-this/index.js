export function bindAll(obj) {
  for (const key of Object.keys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (typeof descriptor.value === 'function') {
      obj[key] = descriptor.value.bind(this);
    }
  }
  return obj;
}
