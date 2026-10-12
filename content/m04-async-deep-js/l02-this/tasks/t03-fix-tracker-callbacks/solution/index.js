export function createTracker() {
  return {
    shipped: [],
    markShipped(order) {
      if (this.shipped.includes(order.id)) {
        return false;
      }
      this.shipped.push(order.id);
      return true;
    },
  };
}

export function markAll(tracker, orders) {
  return orders.filter((order) => tracker.markShipped(order)).length;
}

export function makeMarker(tracker) {
  return tracker.markShipped.bind(tracker);
}
