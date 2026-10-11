export function checkSetup(nodeOutput, npmOutput, minNodeMajor) {
  const nodeText = nodeOutput.trim();
  const nodeMajor = Number(nodeText.slice(1).split(".")[0]);
  if (!nodeText.startsWith("v") || Number.isNaN(nodeMajor)) {
    return ["Node.js не найден. Установите версию LTS с nodejs.org и откройте новый терминал."];
  }
  if (nodeMajor < minNodeMajor) {
    return ["Node.js " + nodeMajor + " устарел: нужна версия " + minNodeMajor + " или новее."];
  }

  const npmMajor = Number(npmOutput.trim().split(".")[0]);
  if (npmOutput.trim() === "" || Number.isNaN(npmMajor)) {
    return ["npm не найден. Он ставится вместе с Node.js: переустановите Node.js."];
  }

  return [];
}
