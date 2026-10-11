export function formatAddress(address) {
  if (address === undefined) {
    return 'Адрес не указан';
  }
  const { city, street, house = 'б/н' } = address;
  return `${city}, ${street}, ${house}`;
}
