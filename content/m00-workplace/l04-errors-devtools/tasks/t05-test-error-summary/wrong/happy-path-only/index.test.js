import { errorSummary } from './index.js';

describe('errorSummary', () => {
  it('разбирает ReferenceError', () => {
    expect(errorSummary('ReferenceError: totl is not defined'), 'Строка про имя').toEqual({
      name: 'ReferenceError',
      message: 'totl is not defined',
    });
  });

  it('разбирает SyntaxError', () => {
    expect(errorSummary('SyntaxError: missing ) after argument list'), 'Строка про синтаксис').toEqual({
      name: 'SyntaxError',
      message: 'missing ) after argument list',
    });
  });
});
