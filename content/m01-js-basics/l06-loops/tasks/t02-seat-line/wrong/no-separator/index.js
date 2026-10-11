export function seatLine(count) {
  let line = '';
  for (let seat = 1; seat <= count; seat++) {
    line += seat;
  }
  return line;
}
