import { shouldIgnore } from './index.js';

describe('shouldIgnore', () => {
  it('игнорирует папку на любом уровне', () => {
    expect(shouldIgnore('node_modules/lib.js', ['node_modules/']), 'Папка в корне').toBe(true);
    expect(shouldIgnore('packages/app/node_modules/lib.js', ['node_modules/']), 'Вложенная папка').toBe(true);
  });

  it('игнорирует точное имя и расширение', () => {
    expect(shouldIgnore('config/.env', ['.env']), 'Точное имя во вложенной папке').toBe(true);
    expect(shouldIgnore('logs/server.log', ['*.log']), 'Расширение .log').toBe(true);
  });

  it('обычный файл не игнорируется', () => {
    expect(shouldIgnore('src/index.js', ['node_modules/', '.env', '*.log']), 'Обычный файл').toBe(false);
  });
});
