export type DeliveryStatus = 'created' | 'packed' | 'onTheWay' | 'delivered' | 'returned';

export interface Delivery {
  id: number;
  status: DeliveryStatus;
}

// TRK-340: подписи статусов. Сейчас справочник пуст.
export const statusLabels = {};

export function labelOf(status: DeliveryStatus): string {
  throw new Error('Не реализовано');
}

export function countByStatus(deliveries: Delivery[]): Record<DeliveryStatus, number> {
  throw new Error('Не реализовано');
}
