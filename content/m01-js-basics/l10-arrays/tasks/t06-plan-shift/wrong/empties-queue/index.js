export function planShift(queue, urgent, capacity) {
  const urgentOrders = [];
  const regularOrders = [];

  while (queue.length > 0) {
    const orderId = queue.shift();
    if (urgentOrders.includes(orderId) || regularOrders.includes(orderId)) {
      continue;
    }
    if (urgent.includes(orderId)) {
      urgentOrders.push(orderId);
    } else {
      regularOrders.push(orderId);
    }
  }

  const plan = urgentOrders;
  for (const orderId of regularOrders) {
    plan.push(orderId);
  }

  return {
    batch: plan.slice(0, capacity),
    left: plan.slice(capacity),
  };
}
