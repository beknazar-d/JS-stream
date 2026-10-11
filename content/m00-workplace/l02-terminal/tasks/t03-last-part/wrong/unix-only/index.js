export function lastPart(path) {
  const parts = path.split("/");
  let last = "";
  for (const part of parts) {
    if (part !== "") {
      last = part;
    }
  }
  return last;
}
