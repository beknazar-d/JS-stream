// true для абсолютного пути (macOS, Linux, Windows), false для относительного.
export function isAbsolutePath(path) {
  return path.startsWith("/");
}
