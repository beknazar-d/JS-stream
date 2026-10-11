export function nodeMajor(versionOutput) {
  const text = versionOutput.trim();
  return Number(text[1]);
}
