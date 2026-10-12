// JSON.parse возвращает any: компилятор верит любому описанию типа.
const fromServer = JSON.parse('{"parcels": "7"}') as { parcels: number };

// Для TypeScript parcels — число. В рантайме это строка.
console.log(typeof fromServer.parcels);
console.log(fromServer.parcels + 1);

// Правильно: проверить и превратить значение самим.
const parcels: number = Number(fromServer.parcels);
console.log(parcels + 1);
