export function printOrder(prefix) {
  return prefix + this.id + ': ' + this.status;
}

export function viaCall(order, prefix) {
  return printOrder.call(order, prefix);
}

export function viaApply(order, args) {
  return printOrder.apply(order, args);
}

export function bindTo(order) {
  return () => printOrder.call(order);
}
