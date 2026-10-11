import { isAbsolutePath } from './index.js';

describe('isAbsolutePath', () => {
  it('путь macOS и Linux', () => {
    expect(isAbsolutePath('/home/anna/shop'), 'Путь с косой чертой в начале').toBe(true);
  });

  it('путь Windows с диском C', () => {
    expect(isAbsolutePath('C:\\Users\\anna\\shop'), 'Путь Windows, диск C').toBe(true);
  });

  it('относительные пути', () => {
    expect(isAbsolutePath('src/index.js'), 'Путь от текущей папки').toBe(false);
    expect(isAbsolutePath('./src'), 'Путь с точкой').toBe(false);
    expect(isAbsolutePath('../docs'), 'Путь с двумя точками').toBe(false);
  });
});
