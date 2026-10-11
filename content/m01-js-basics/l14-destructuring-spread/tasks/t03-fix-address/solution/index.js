export function formatAddress(address) {
  if (!address) {
    return 'Адрес не указан';
  }
  const { city, street, house = 'б/н' } = address;
  return `${city}, ${street}, ${house}`;
}
