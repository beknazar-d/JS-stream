export function lastPart(path) {
  const parts = path.split("\\").join("/").split("/");
  return parts[parts.length - 1];
}
