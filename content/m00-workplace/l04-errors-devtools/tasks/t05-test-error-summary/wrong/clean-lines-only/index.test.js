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

  it('строка без типа', () => {
    expect(errorSummary('connection lost'), 'Нет разделителя').toEqual({ name: 'Error', message: 'connection lost' });
  });
});
