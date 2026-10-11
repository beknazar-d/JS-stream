export function isSupportedNode(versionOutput, minMajor) {
  const major = versionOutput.trim().slice(1).split(".")[0];
  return major >= String(minMajor);
}
