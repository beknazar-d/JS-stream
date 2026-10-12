// Тикет DEV-512: одна функция «взять первого» для всех очередей.
export function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}
