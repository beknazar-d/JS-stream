export function lastPart(path) {
  const parts = path.split("\\").join("/").split("/");
  for (const part of parts) {
    if (part !== "") {
      return part;
    }
  }
  return "";
}
