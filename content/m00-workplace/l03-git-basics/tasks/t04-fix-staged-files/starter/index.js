// statusLines — массив строк вывода git status --short.
// Возвращает имена файлов, которые войдут в следующий коммит.
export function stagedFiles(statusLines) {
  const staged = [];
  for (const line of statusLines) {
    const code = line.slice(0, 2);
    if (code[1] !== " " && code[1] !== "?") {
      staged.push(line.slice(3));
    }
  }
  return staged;
}
