export function isExpired(expiresOn, now) {
  const dayStart = new Date(`${expiresOn}T00:00:00Z`);
  if (Number.isNaN(dayStart.getTime())) {
    throw new Error('Некорректная дата окончания');
  }
  return now.getTime() >= dayStart.getTime();
}
