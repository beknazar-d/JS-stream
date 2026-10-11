export function isExpired(expiresOn, now) {
  const dayStart = new Date(`${expiresOn}T00:00:00Z`);
  const endExclusive = dayStart.getTime() + 24 * 60 * 60 * 1000;
  return now.getTime() >= endExclusive;
}
