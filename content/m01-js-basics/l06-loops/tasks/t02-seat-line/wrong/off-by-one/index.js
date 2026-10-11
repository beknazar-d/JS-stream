export function seatLine(count) {
  let line = '';
  for (let seat = 1; seat < count; seat++) {
    if (line !== '') {
      line += ' ';
    }
    line += seat;
  }
  return line;
}
