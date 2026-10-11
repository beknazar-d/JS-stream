export function checkSetup(nodeOutput, npmOutput, minNodeMajor) {
  const problems = [];

  const nodeText = nodeOutput.trim();
  const nodeMajor = Number(nodeText.slice(1).split(".")[0]);
  if (!nodeText.startsWith("v") || Number.isNaN(nodeMajor)) {
    problems.push("Node.js не найден. Установите версию LTS с nodejs.org и откройте новый терминал.");
  } else if (nodeMajor < minNodeMajor) {
    problems.push("Node.js " + nodeMajor + " устарел: нужна версия " + minNodeMajor + " или новее.");
  }

  return problems;
}
