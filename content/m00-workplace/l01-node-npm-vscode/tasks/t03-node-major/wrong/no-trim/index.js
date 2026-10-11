export function nodeMajor(versionOutput) {
  const parts = versionOutput.slice(1).split(".");
  return Number(parts[0]);
}
