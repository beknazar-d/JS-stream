export function isSupportedNode(versionOutput, minMajor) {
  const major = Number(versionOutput.trim().slice(1).split(".")[0]);
  return major > minMajor;
}
