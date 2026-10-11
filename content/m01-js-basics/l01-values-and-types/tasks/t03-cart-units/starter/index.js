export function countUnits(lines) {
  let units = 0;
  for (const line of lines) {
    units = units + line.quantity;
  }
  return units;
}
