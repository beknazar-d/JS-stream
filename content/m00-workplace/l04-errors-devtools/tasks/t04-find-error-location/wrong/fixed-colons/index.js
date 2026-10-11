export function findErrorLocation(stackText) {
  for (const raw of stackText.split("\n")) {
    const frame = raw.trim();
    if (!frame.startsWith("at ")) {
      continue;
    }

    let place = frame.slice(3);
    if (place.endsWith(")")) {
      place = place.slice(place.lastIndexOf("(") + 1, -1);
    }
    if (place.startsWith("node:")) {
      continue;
    }

    const parts = place.split(":");
    const file = parts[0];
    const line = Number(parts[1]);
    const column = Number(parts[2]);
    if (Number.isNaN(line) || Number.isNaN(column)) {
      continue;
    }
    return { file: file, line: line, column: column };
  }
  return null;
}
