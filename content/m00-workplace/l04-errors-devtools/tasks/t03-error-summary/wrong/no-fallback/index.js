export function errorSummary(line) {
  const text = line.trim();
  const at = text.indexOf(": ");
  return { name: text.slice(0, at), message: text.slice(at + 2) };
}
