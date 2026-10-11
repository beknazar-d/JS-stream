export function lastPart(path) {
  const unified = path.split("\\").join("/");
  const parts = unified.split("/");
  let last = "";
  for (const part of parts) {
    if (part !== "") {
      last = part;
    }
  }
  return last;
}
