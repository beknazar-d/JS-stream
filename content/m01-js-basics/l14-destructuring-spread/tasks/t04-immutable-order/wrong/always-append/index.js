export function setStatus(order, status) {
  return { ...order, status };
}

export function addLine(order, line) {
  return { ...order, lines: [...order.lines, line] };
}

export function changeCity(order, city) {
  return {
    ...order,
    customer: {
      ...order.customer,
      address: { ...order.customer.address, city },
    },
  };
}
