const params = new URLSearchParams('?category=kettles&sort=price-asc&sort=rating');

console.log(params.get('category'));
console.log(params.get('sort'));
console.log(params.getAll('sort').length);
console.log(params.get('page'));

params.set('page', 2);
params.delete('sort');
console.log(params.toString());

const url = new URL('/catalog?q=чайник Bosch', 'https://domoteka.example');
console.log(url.search);
console.log(url.searchParams.get('q'));
