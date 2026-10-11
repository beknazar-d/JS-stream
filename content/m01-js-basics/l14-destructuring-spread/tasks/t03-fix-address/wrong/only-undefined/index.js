export function formatAddress(address) {
  if (!address) {
    return 'Адрес не указан';
  }
  const { city, street, house } = address;
  return `${city}, ${street}, ${house}`;
}
