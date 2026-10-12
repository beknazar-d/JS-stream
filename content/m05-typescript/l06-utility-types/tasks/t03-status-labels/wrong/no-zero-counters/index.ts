export type DeliveryStatus = 'created' | 'packed' | 'onTheWay' | 'delivered' | 'returned';

export interface Delivery {
  id: number;
  status: DeliveryStatus;
}

export const statusLabels: Record<DeliveryStatus, string> = {
  created: 'Создан',
  packed: 'Собран',
  onTheWay: 'В пути',
  delivered: 'Доставлен',
  returned: 'Возврат',
};

export function labelOf(status: DeliveryStatus): string {
  return statusLabels[status];
}

export function countByStatus(deliveries: Delivery[]): Record<DeliveryStatus, number> {
  const counters: Partial<Record<DeliveryStatus, number>> = {};
  for (const delivery of deliveries) {
    counters[delivery.status] = (counters[delivery.status] ?? 0) + 1;
  }
  return counters as Record<DeliveryStatus, number>;
}
