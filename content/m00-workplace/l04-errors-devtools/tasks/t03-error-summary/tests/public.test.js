import { errorSummary } from './index.js';

describe('errorSummary', () => {
  it('ReferenceError', () => {
    expect(errorSummary('ReferenceError: totl is not defined'), 'Строка про необъявленное имя').toEqual({
      name: 'ReferenceError',
      message: 'totl is not defined',
    });
  });

  it('TypeError со скобками в тексте', () => {
    expect(errorSummary("TypeError: Cannot read properties of undefined (reading 'replace')"), 'Строка про чтение у undefined').toEqual({
      name: 'TypeError',
      message: "Cannot read properties of undefined (reading 'replace')",
    });
  });
});
