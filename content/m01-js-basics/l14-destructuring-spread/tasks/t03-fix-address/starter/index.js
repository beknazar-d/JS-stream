// Собирает адрес для накладной.
export function formatAddress({ city, street, house }) {
  return `${city}, ${street}, ${house}`;
}
