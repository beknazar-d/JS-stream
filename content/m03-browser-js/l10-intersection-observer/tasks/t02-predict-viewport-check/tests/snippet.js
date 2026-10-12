// Упрощённая модель Intersection Observer по вертикали.
// Высота окна 800. Элемент задан верхней и нижней границей относительно верха окна.
// rootMargin увеличивает область слежения сверху и снизу.
// Элемент считается пересекающим, если его видимая часть больше нуля
// и доля видимой части не меньше threshold.
function check(element, { rootMargin = 0, threshold = 0 } = {}) {
  const areaTop = 0 - rootMargin;
  const areaBottom = 800 + rootMargin;
  const visible = Math.max(0, Math.min(element.bottom, areaBottom) - Math.max(element.top, areaTop));
  const ratio = visible / (element.bottom - element.top);
  const isIntersecting = visible > 0 && ratio >= threshold;
  return isIntersecting + ' ' + ratio;
}

console.log(check({ top: 900, bottom: 1000 }));
console.log(check({ top: 900, bottom: 1000 }, { rootMargin: 200 }));
console.log(check({ top: 700, bottom: 900 }));
console.log(check({ top: 700, bottom: 900 }, { threshold: 0.75 }));
console.log(check({ top: 1100, bottom: 1300 }, { rootMargin: 200 }));
console.log(check({ top: 750, bottom: 850 }, { threshold: 0.5 }));
