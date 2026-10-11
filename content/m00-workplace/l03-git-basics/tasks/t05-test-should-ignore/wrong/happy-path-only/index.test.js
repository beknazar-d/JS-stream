import { shouldIgnore } from './index.js';

describe('shouldIgnore', () => {
  it('игнорирует папку в корне', () => {
    expect(shouldIgnore('node_modules/lib.js', ['node_modules/']), 'Папка в корне').toBe(true);
  });

  it('игнорирует точное имя', () => {
    expect(shouldIgnore('.env', ['.env']), 'Точное имя').toBe(true);
  });

  it('игнорирует расширение', () => {
    expect(shouldIgnore('server.log', ['*.log']), 'Расширение .log').toBe(true);
  });

  it('обычный файл не игнорируется', () => {
    expect(shouldIgnore('src/index.js', ['node_modules/', '.env', '*.log']), 'Обычный файл').toBe(false);
  });
});
