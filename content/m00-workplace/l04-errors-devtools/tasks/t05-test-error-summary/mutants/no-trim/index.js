export function errorSummary(line) {
  const text = line;
  const at = text.indexOf(": ");
  if (at === -1) {
    return { name: "Error", message: text };
  }
  return { name: text.slice(0, at), message: text.slice(at + 2) };
}
