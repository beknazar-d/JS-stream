// Тикет DEV-512: одна функция «взять первого» для всех очередей.
export function firstItem(items: unknown[]): unknown {
  return items[0];
}
