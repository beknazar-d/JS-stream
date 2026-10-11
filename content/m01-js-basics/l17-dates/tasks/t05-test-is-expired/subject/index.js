// Промокод действует весь день expiresOn по UTC включительно.
export function isExpired(expiresOn, now) {
  const dayStart = new Date(`${expiresOn}T00:00:00Z`);
  if (Number.isNaN(dayStart.getTime())) {
    throw new Error('Некорректная дата окончания');
  }
  const endExclusive = dayStart.getTime() + 24 * 60 * 60 * 1000;
  return now.getTime() >= endExclusive;
}
