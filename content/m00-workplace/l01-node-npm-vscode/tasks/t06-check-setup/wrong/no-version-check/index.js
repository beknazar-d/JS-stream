export function checkSetup(nodeOutput, npmOutput, minNodeMajor) {
  const problems = [];

  const nodeText = nodeOutput.trim();
  const nodeMajor = Number(nodeText.slice(1).split(".")[0]);
  if (!nodeText.startsWith("v") || Number.isNaN(nodeMajor)) {
    problems.push("Node.js не найден. Установите версию LTS с nodejs.org и откройте новый терминал.");
  }

  const npmMajor = Number(npmOutput.trim().split(".")[0]);
  if (npmOutput.trim() === "" || Number.isNaN(npmMajor)) {
    problems.push("npm не найден. Он ставится вместе с Node.js: переустановите Node.js.");
  }

  return problems;
}
