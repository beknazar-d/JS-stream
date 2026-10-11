import { isAbsolutePath } from './index.js';

describe('isAbsolutePath: другие диски и косые черты', () => {
  it('любая буква диска и любой регистр', () => {
    expect(isAbsolutePath('D:\\data'), 'Диск D').toBe(true);
    expect(isAbsolutePath('d:\\data'), 'Диск d в нижнем регистре').toBe(true);
    expect(isAbsolutePath('Z:\\'), 'Диск Z, только корень').toBe(true);
  });

  it('прямая косая черта в пути Windows', () => {
    expect(isAbsolutePath('C:/Users/anna'), 'Диск C, прямые косые черты').toBe(true);
  });
});

describe('isAbsolutePath: относительные, похожие на абсолютные', () => {
  it('двоеточие в имени не делает путь абсолютным', () => {
    expect(isAbsolutePath('notes:draft.txt'), 'Файл с двоеточием в имени').toBe(false);
    expect(isAbsolutePath('reports/2026:summary.txt'), 'Двоеточие не вторым символом').toBe(false);
  });

  it('диск без косой черты и одиночные символы', () => {
    expect(isAbsolutePath('C:file.txt'), 'Диск без косой черты — путь относительно диска').toBe(false);
    expect(isAbsolutePath(''), 'Пустая строка').toBe(false);
    expect(isAbsolutePath('a'), 'Один символ').toBe(false);
    expect(isAbsolutePath('shop'), 'Просто имя').toBe(false);
  });

  it('имя без точки в начале остаётся относительным', () => {
    expect(isAbsolutePath('docs/guide.md'), 'Путь не с точки, но относительный').toBe(false);
  });
});
