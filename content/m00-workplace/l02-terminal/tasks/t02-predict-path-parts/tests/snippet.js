const folder = "/home/anna/shop/src";
const parts = folder.split("/");

console.log(parts.length);
console.log(parts[0] === "");
console.log(parts[parts.length - 1]);
console.log(parts.slice(0, 3).join("/"));
console.log("src/index.js".split("/").length);
console.log("../docs/guide.md".split("/")[0]);
