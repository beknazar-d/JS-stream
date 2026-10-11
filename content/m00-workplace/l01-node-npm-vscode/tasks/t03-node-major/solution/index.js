export function nodeMajor(versionOutput) {
  const text = versionOutput.trim();
  const withoutV = text.slice(1);
  const parts = withoutV.split(".");
  return Number(parts[0]);
}
