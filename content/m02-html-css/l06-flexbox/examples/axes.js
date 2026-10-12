// Какая ось главная и какое свойство ей управляет.
function axes(direction) {
  if (direction === "row") {
    return { main: "горизонталь", cross: "вертикаль" };
  }
  return { main: "вертикаль", cross: "горизонталь" };
}

for (const direction of ["row", "column"]) {
  const { main, cross } = axes(direction);
  console.log(`${direction}: justify-content по оси «${main}», align-items по оси «${cross}»`);
}
