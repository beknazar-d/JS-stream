export function errorSummary(line) {
  const text = line.trim();
  if (!text.includes(": ")) {
    return { name: "Error", message: text };
  }
  const parts = text.split(": ");
  return { name: parts[0], message: parts[1] };
}
