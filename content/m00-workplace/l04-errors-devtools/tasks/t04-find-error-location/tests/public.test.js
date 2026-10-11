import { findErrorLocation } from './index.js';

const typoStack = `/home/anna/shop/typo.js:1
console.Log("Привет");
        ^

TypeError: console.Log is not a function
    at Object.<anonymous> (/home/anna/shop/typo.js:1:9)
    at Module._compile (node:internal/modules/cjs/loader:1706:14)
    at Object..js (node:internal/modules/cjs/loader:1839:10)
    at Module.load (node:internal/modules/cjs/loader:1441:32)
    at node:internal/main/run_main_module:36:49

Node.js v22.22.0`;

const missingModuleStack = `node:internal/modules/cjs/loader:1386
  throw err;
  ^

Error: Cannot find module '/home/anna/shop/helo.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1383:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1025:19)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}`;

describe('findErrorLocation', () => {
  it('находит кадр с вашим файлом', () => {
    expect(findErrorLocation(typoStack), 'Стектрейс ошибки console.Log').toEqual({
      file: '/home/anna/shop/typo.js',
      line: 1,
      column: 9,
    });
  });

  it('номера строки и столбца — числа', () => {
    const result = findErrorLocation(typoStack);
    expect(result.line, 'Тип номера строки').toBeTypeOf('number');
    expect(result.column, 'Тип номера столбца').toBeTypeOf('number');
  });

  it('только внутренние кадры Node.js: результат null', () => {
    expect(findErrorLocation(missingModuleStack), 'Ошибка до запуска вашего кода').toBeNull();
  });
});
