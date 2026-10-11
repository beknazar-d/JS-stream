import { errorSummary } from './index.js';

describe('errorSummary: краевые случаи', () => {
  it('второе двоеточие остаётся в тексте', () => {
    expect(errorSummary('Error: Failed: timeout'), 'Двоеточие в тексте').toEqual({ name: 'Error', message: 'Failed: timeout' });
  });

  it('пробелы и перевод строки по краям', () => {
    expect(errorSummary('  SyntaxError: missing ) after argument list\n'), 'Строка с пробелами и переводом строки').toEqual({
      name: 'SyntaxError',
      message: 'missing ) after argument list',
    });
  });

  it('строка без типа', () => {
    expect(errorSummary('connection lost'), 'Нет «: » в строке').toEqual({ name: 'Error', message: 'connection lost' });
  });

  it('двоеточие без пробела не разделитель', () => {
    expect(errorSummary('path C:\\data'), 'Двоеточие без пробела после него').toEqual({ name: 'Error', message: 'path C:\\data' });
  });
});
