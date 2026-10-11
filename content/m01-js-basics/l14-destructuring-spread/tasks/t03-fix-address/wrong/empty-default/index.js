export function formatAddress({ city, street, house = 'б/н' } = {}) {
  return `${city}, ${street}, ${house}`;
}
