import { errorSummary } from './index.js';

describe('errorSummary', () => {
  it('разбирает обычную строку', () => {
    expect(errorSummary('ReferenceError: totl is not defined'), 'Строка про имя').toEqual({
      name: 'ReferenceError',
      message: 'totl is not defined',
    });
  });

  it('двоеточие в тексте остаётся', () => {
    expect(errorSummary('Error: Failed: timeout'), 'Второе двоеточие').toEqual({ name: 'Error', message: 'Failed: timeout' });
  });

  it('пробелы по краям убираются', () => {
    expect(errorSummary('  TypeError: x is not a function\n'), 'Пробелы и перевод строки').toEqual({
      name: 'TypeError',
      message: 'x is not a function',
    });
  });
});
