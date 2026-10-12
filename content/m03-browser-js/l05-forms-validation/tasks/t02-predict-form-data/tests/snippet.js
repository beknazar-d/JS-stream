const data = new FormData();
data.append('title', 'Чайник K-200');
data.append('qty', '2');
data.append('gift', 'on');
data.append('gift', 'wrap');

console.log(data.get('qty'));
console.log(typeof data.get('qty'));
console.log(data.get('qty') + 1);
console.log(Number(data.get('qty')) + 1);
console.log(data.get('color'));
console.log(data.getAll('gift'));
console.log(Object.fromEntries(data));
data.delete('gift');
console.log(data.has('gift'));
console.log([...data.keys()]);
