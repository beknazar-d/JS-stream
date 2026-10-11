export function shouldIgnore(path, rules) {
  const parts = path.split("/");
  const name = parts[parts.length - 1];
  const folders = parts.slice(0, -1);

  for (const rule of rules) {
    if (rule.endsWith("/")) {
      if (folders[0] === rule.slice(0, -1)) {
        return true;
      }
    } else if (rule.startsWith("*.")) {
      if (name.endsWith(rule.slice(1))) {
        return true;
      }
    } else if (name === rule) {
      return true;
    }
  }
  return false;
}
