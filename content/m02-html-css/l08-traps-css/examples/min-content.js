// Flex-элемент не уже самого длинного слова, если не поставить min-width: 0.
function minContent(text, charWidth) {
  const words = text.split(" ");
  let longest = 0;
  for (const word of words) longest = Math.max(longest, word.length);
  return longest * charWidth;
}

function fits(containerWidth, otherWidth, text, canShrink) {
  const available = containerWidth - otherWidth;
  const minimum = canShrink ? 0 : minContent(text, 8);
  return minimum <= available;
}

const name = "Холодильник_двухкамерный_Nord_NR120_белый";
console.log(minContent(name, 8));
console.log(fits(400, 100, name, false));
console.log(fits(400, 100, name, true));
