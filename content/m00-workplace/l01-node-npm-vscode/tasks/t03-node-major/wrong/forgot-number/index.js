export function nodeMajor(versionOutput) {
  const parts = versionOutput.trim().slice(1).split(".");
  return parts[0];
}
