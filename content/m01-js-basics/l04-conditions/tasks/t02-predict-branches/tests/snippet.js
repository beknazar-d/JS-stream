function label(value) {
  if (value) {
    return "истина";
  }
  return "ложь";
}

function zoneDays(code) {
  let days = 7;
  switch (code) {
    case "A":
      days = 1;
    case "B":
      days = 2;
      break;
    default:
      days = 9;
  }
  return days;
}

console.log(label(0));
console.log(label("0"));
console.log(label(""));
console.log(label(NaN));
console.log(zoneDays("A"));
console.log(zoneDays("B"));
console.log(zoneDays("Z"));
console.log(5 > 3 ? "много" : "мало");
