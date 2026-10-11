export function errorSummary(line) {
  const text = line.trim();
  const at = text.indexOf(": ");
  if (at === -1) {
    return { name: "Error", message: text };
  }
  return { name: text.slice(0, at), message: "" };
}
