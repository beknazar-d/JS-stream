// Форматирование денег. Этот файл используется по всему сайту, менять его не нужно.
export function formatPrice(rub) {
  return `${rub.toFixed(2)} ₽`;
}
