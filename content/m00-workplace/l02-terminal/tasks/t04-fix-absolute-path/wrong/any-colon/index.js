export function isAbsolutePath(path) {
  return path.startsWith("/") || path.includes(":");
}
