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

    const parts = place.split(":");
    const column = Number(parts[parts.length - 1]);
    const line = Number(parts[parts.length - 2]);
    let file = parts.slice(0, -2).join(":");
    if (file.startsWith("file://")) {
      file = file.slice(7);
    }
    return { file: file, line: line, column: column };
  }
  return null;
}
