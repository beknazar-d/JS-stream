export function isAbsolutePath(path) {
  return path !== "" && !path.startsWith(".");
}
