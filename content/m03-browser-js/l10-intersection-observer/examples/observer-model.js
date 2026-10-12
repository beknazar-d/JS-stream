// Модель наблюдателя: сообщает о каждом элементе сразу после observe,
// а потом только когда состояние изменилось. Окно высотой 800.
function createObserver(callback) {
  const state = new Map(); // элемент → был ли виден в прошлый раз
  return {
    observe(element, scrollY) {
      state.set(element, undefined);
      this.check(scrollY);
    },
    unobserve(element) {
      state.delete(element);
    },
    check(scrollY) {
      const entries = [];
      for (const [element, wasVisible] of state) {
        const visible = element.top < scrollY + 800 && element.bottom > scrollY;
        if (visible !== wasVisible) {
          state.set(element, visible);
          entries.push({ name: element.name, isIntersecting: visible });
        }
      }
      if (entries.length) callback(entries);
    },
  };
}

const photos = [
  { name: "фото 1", top: 100, bottom: 300 },
  { name: "фото 2", top: 900, bottom: 1100 },
  { name: "фото 3", top: 1000, bottom: 1200 },
];

const observer = createObserver((entries) => {
  console.log(entries.map((e) => e.name + ": " + e.isIntersecting).join(", "));
});

console.log("Начали следить (прокрутка 0):");
photos.forEach((photo) => observer.observe(photo, 0));

console.log("Прокрутили на 400:");
observer.check(400);
console.log("Прокрутили на 1300:");
observer.check(1300);
