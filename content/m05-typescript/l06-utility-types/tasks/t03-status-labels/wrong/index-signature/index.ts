export type DeliveryStatus = 'created' | 'packed' | 'onTheWay' | 'delivered' | 'returned';

export interface Delivery {
  id: number;
  status: DeliveryStatus;
}

export const statusLabels: { [status: string]: string } = {
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
  const counters: Record<DeliveryStatus, number> = { created: 0, packed: 0, onTheWay: 0, delivered: 0, returned: 0 };
  for (const delivery of deliveries) {
    counters[delivery.status] += 1;
  }
  return counters;
}
