// Нумерация мест: номер 13 пропускаем, выдать нужно 5 мест.
let number = 10;
let issued = 0;

while (issued < 5) {
  number++;
  if (number === 13) {
    continue;
  }
  console.log(`Место ${number}`);
  issued++;
}
