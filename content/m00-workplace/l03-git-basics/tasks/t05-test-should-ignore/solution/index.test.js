import { shouldIgnore } from './index.js';

describe('shouldIgnore: правила-папки', () => {
  it('игнорирует файл в папке в корне проекта', () => {
    expect(shouldIgnore('node_modules/express/index.js', ['node_modules/']), 'Папка в корне').toBe(true);
  });

  it('игнорирует файл в папке на любом уровне вложенности', () => {
    expect(shouldIgnore('packages/app/node_modules/lib.js', ['node_modules/']), 'Папка на третьем уровне').toBe(true);
  });

  it('не игнорирует файл, чья папка называется иначе', () => {
    expect(shouldIgnore('src/modules/index.js', ['node_modules/']), 'Папка modules — не node_modules').toBe(false);
  });
});

describe('shouldIgnore: правила-расширения', () => {
  it('игнорирует файл с нужным расширением в любой папке', () => {
    expect(shouldIgnore('server.log', ['*.log']), 'Файл в корне').toBe(true);
    expect(shouldIgnore('logs/2026/server.log', ['*.log']), 'Файл во вложенной папке').toBe(true);
  });

  it('не игнорирует файл, у которого нет точки перед log', () => {
    expect(shouldIgnore('changelog', ['*.log']), 'Имя заканчивается на log, но расширения нет').toBe(false);
  });

  it('не игнорирует файл с другим расширением', () => {
    expect(shouldIgnore('src/index.js', ['*.log']), 'Расширение .js').toBe(false);
  });
});

describe('shouldIgnore: правила-имена', () => {
  it('игнорирует файл с точным именем', () => {
    expect(shouldIgnore('.env', ['.env']), 'Точное имя в корне').toBe(true);
    expect(shouldIgnore('config/.env', ['.env']), 'Точное имя во вложенной папке').toBe(true);
  });

  it('не игнорирует похожее имя', () => {
    expect(shouldIgnore('.env.example', ['.env']), 'Имя .env.example — другой файл').toBe(false);
  });
});

describe('shouldIgnore: несколько правил', () => {
  it('срабатывает любое подходящее правило', () => {
    const rules = ['node_modules/', '.env', '*.log'];
    expect(shouldIgnore('app.log', rules), 'Подходит третье правило').toBe(true);
    expect(shouldIgnore('src/index.js', rules), 'Не подходит ни одно').toBe(false);
  });

  it('без правил не игнорируется ничего', () => {
    expect(shouldIgnore('.env', []), 'Пустой список правил').toBe(false);
  });
});
