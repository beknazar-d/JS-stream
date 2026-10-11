export function seatLine(count) {
  let line = '';
  let seat = 1;
  do {
    if (line !== '') {
      line += ' ';
    }
    line += seat;
    seat++;
  } while (seat <= count);
  return line;
}
