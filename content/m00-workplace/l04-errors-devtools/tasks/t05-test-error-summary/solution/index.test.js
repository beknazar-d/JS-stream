import { errorSummary } from './index.js';

describe('errorSummary: обычные строки', () => {
  it('разбирает ReferenceError', () => {
    expect(errorSummary('ReferenceError: totl is not defined'), 'Строка про необъявленное имя').toEqual({
      name: 'ReferenceError',
      message: 'totl is not defined',
    });
  });

  it('разбирает TypeError со скобками в тексте', () => {
    expect(errorSummary("TypeError: Cannot read properties of undefined (reading 'name')"), 'Строка про чтение у undefined').toEqual({
      name: 'TypeError',
      message: "Cannot read properties of undefined (reading 'name')",
    });
  });
});

describe('errorSummary: двоеточие в тексте', () => {
  it('делит только по первому разделителю', () => {
    expect(errorSummary('Error: Failed: timeout'), 'Второе двоеточие остаётся в тексте').toEqual({
      name: 'Error',
      message: 'Failed: timeout',
    });
  });
});

describe('errorSummary: грязный ввод', () => {
  it('убирает пробелы и перевод строки по краям', () => {
    expect(errorSummary('  TypeError: x is not a function\n'), 'Строка с пробелами и переводом строки').toEqual({
      name: 'TypeError',
      message: 'x is not a function',
    });
  });

  it('строка без типа получает имя Error', () => {
    expect(errorSummary('connection lost'), 'Нет разделителя').toEqual({ name: 'Error', message: 'connection lost' });
  });

  it('строка без типа тоже очищается от пробелов', () => {
    expect(errorSummary('  connection lost \n'), 'Нет разделителя, пробелы по краям').toEqual({
      name: 'Error',
      message: 'connection lost',
    });
  });
});
