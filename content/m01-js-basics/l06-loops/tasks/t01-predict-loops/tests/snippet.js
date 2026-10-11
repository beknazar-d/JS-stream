const seatsTotal = 5;
let line = "";
for (let seat = 1; seat <= seatsTotal; seat++) {
  if (seat === 3) {
    continue;
  }
  line = line + seat;
}
console.log(line);

let paid = 0;
let month = 0;
while (paid < 7000) {
  month++;
  paid += 3000;
}
console.log(month);
console.log(paid);

let tries = 10;
do {
  tries++;
} while (tries < 5);
console.log(tries);

let dashAt = -1;
const code = "A7-K9";
for (let i = 0; i < code.length; i++) {
  if (code[i] === "-") {
    dashAt = i;
    break;
  }
}
console.log(dashAt);
console.log(code.length - 1);
