// unknown: принимает любое значение, но пользоваться им нельзя без проверки.
function describeValue(value: unknown): string {
  if (typeof value === "number") {
    return `число ${value.toFixed(1)}`;
  }
  if (typeof value === "string") {
    return `строка «${value.trim()}»`;
  }
  return "что-то другое";
}

console.log(describeValue(12));
console.log(describeValue("  Москва "));
console.log(describeValue(null));
