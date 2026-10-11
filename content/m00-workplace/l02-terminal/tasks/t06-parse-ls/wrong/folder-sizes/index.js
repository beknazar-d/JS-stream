export function parseLs(output) {
  const folders = [];
  const files = [];
  let totalBytes = 0;

  for (const line of output.split("\n")) {
    const fields = [];
    for (const piece of line.split(" ")) {
      if (piece !== "") {
        fields.push(piece);
      }
    }
    if (fields.length < 9) {
      continue;
    }

    const name = fields.slice(8).join(" ");
    if (name === "." || name === "..") {
      continue;
    }

    totalBytes = totalBytes + Number(fields[4]);
    if (fields[0].startsWith("d")) {
      folders.push(name);
    } else {
      files.push(name);
    }
  }

  return { folders: folders, files: files, totalBytes: totalBytes };
}
