export function countUnits(lines) {
  let units = 0;
  for (const line of lines) {
    units = units + Number(line.quantity);
  }
  return units;
}
