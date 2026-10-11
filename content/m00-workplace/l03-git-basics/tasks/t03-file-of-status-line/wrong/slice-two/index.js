export function fileOf(line) {
  let name = line.slice(2);
  if (name.startsWith('"') && name.endsWith('"')) {
    name = name.slice(1, -1);
  }
  return name;
}
