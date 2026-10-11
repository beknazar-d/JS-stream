import { shouldIgnore } from './index.js';

describe('shouldIgnore', () => {
  it('игнорирует папку в корне', () => {
    expect(shouldIgnore('node_modules/lib.js', ['node_modules/']), 'Папка в корне').toBe(true);
  });

  it('похожее имя не игнорируется', () => {
    expect(shouldIgnore('.env.example', ['.env']), 'Файл .env.example').toBe(false);
    expect(shouldIgnore('changelog', ['*.log']), 'Файл changelog').toBe(false);
  });

  it('игнорирует точное имя и расширение в корне', () => {
    expect(shouldIgnore('.env', ['.env']), 'Точное имя').toBe(true);
    expect(shouldIgnore('server.log', ['*.log']), 'Расширение .log').toBe(true);
  });

  it('другая папка не игнорируется', () => {
    expect(shouldIgnore('src/index.js', ['node_modules/']), 'Папка src').toBe(false);
  });
});
