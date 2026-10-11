export function isAbsolutePath(path) {
  if (path.startsWith("/")) {
    return true;
  }
  const letter = path.slice(0, 1).toUpperCase();
  const isLetter = letter >= "A" && letter <= "Z";
  const slash = path.slice(2, 3);
  return isLetter && path.slice(1, 2) === ":" && (slash === "\\" || slash === "/");
}
