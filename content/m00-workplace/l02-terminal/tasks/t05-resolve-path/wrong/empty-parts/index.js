export function resolvePath(cwd, target) {
  const full = target.startsWith("/") ? target : cwd + "/" + target;
  const stack = [];
  for (const part of full.split("/").slice(1)) {
    if (part === ".") {
      continue;
    }
    if (part === "..") {
      stack.pop();
      continue;
    }
    stack.push(part);
  }
  return "/" + stack.join("/");
}
