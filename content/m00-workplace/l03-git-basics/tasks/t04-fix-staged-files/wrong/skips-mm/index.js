export function stagedFiles(statusLines) {
  const staged = [];
  for (const line of statusLines) {
    const code = line.slice(0, 2);
    if (code[0] !== " " && code[0] !== "?" && code[1] === " ") {
      staged.push(line.slice(3));
    }
  }
  return staged;
}
