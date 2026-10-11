export function countUnits(lines) {
  let units = 0;
  for (const line of lines) {
    const quantity = Number(line.quantity);
    if (!Number.isNaN(quantity)) {
      units = units + quantity;
    }
  }
  return units;
}
