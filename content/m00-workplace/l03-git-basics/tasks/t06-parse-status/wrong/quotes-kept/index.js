export function parseStatus(output) {
  const staged = [];
  const unstaged = [];
  const untracked = [];

  for (const line of output.split("\n")) {
    if (line === "") {
      continue;
    }

    const code = line.slice(0, 2);
    let name = line.slice(3);

    const arrow = name.indexOf(" -> ");
    if (arrow !== -1) {
      name = name.slice(arrow + 4);
    }

    if (code === "??") {
      untracked.push(name);
    } else {
      if (code[0] !== " ") {
        staged.push(name);
      }
      if (code[1] !== " ") {
        unstaged.push(name);
      }
    }
  }

  return { staged: staged, unstaged: unstaged, untracked: untracked };
}
