import { undefinedVariable, notAFunction, readOfUndefined, brokenSyntax, breakpointWord } from './index.js';

describe('Типы ошибок и точка останова', () => {
  it('необъявленное имя', () => {
    expect(undefinedVariable.trim(), 'Тип для «totl is not defined»').toBe('ReferenceError');
  });

  it('значение — не функция', () => {
    expect(notAFunction.trim(), 'Тип для «price.toFixed is not a function»').toBe('TypeError');
  });

  it('чтение свойства у undefined', () => {
    expect(readOfUndefined.trim(), 'Тип для «Cannot read properties of undefined»').toBe('TypeError');
  });

  it('нарушены правила записи кода', () => {
    expect(brokenSyntax.trim(), 'Тип для «missing ) after argument list»').toBe('SyntaxError');
  });

  it('слово для точки останова', () => {
    expect(breakpointWord.trim(), 'Слово для точки останова в коде').toBe('debugger');
  });
});
