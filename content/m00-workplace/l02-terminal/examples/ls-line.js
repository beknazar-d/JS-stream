// Одна строка вывода ls -l. Между полями несколько пробелов подряд.
const line = "-rw-r--r-- 1 anna anna    18 Oct  8 12:10 index.js";
const pieces = line.split(" ");
console.log(pieces.length);

// Пустые куски выкидываем: оставляем только непустые поля.
const fields = [];
for (const piece of pieces) {
  if (piece !== "") {
    fields.push(piece);
  }
}
console.log(fields.length);
console.log(fields[4]);
console.log(fields[8]);

// Папки в ls -l отмечены буквой d в начале строки.
console.log("drwxr-xr-x 2 anna anna 4096 Oct 9 13:00 src".startsWith("d"));
console.log(line.startsWith("d"));
