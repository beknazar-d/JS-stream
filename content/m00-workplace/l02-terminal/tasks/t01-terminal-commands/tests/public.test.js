import { showCurrentFolder, listFiles, makeFolder, goUp, runScript } from './index.js';

const clean = (command) => String(command).trim().replace(/\s+/g, ' ');

describe('Команды терминала', () => {
  it('показать текущую папку', () => {
    expect(clean(showCurrentFolder), 'Команда «где я»').toBe('pwd');
  });

  it('показать содержимое папки', () => {
    expect(['ls', 'dir'], 'Команда «что здесь лежит»: ls (или dir на Windows). Получено: ' + clean(listFiles)).toContain(clean(listFiles));
  });

  it('создать папку reports', () => {
    expect(clean(makeFolder), 'Команда «создать папку reports»').toBe('mkdir reports');
  });

  it('подняться на уровень выше', () => {
    expect(clean(goUp), 'Команда «подняться выше». Между cd и точками нужен пробел').toBe('cd ..');
  });

  it('запустить скрипт', () => {
    expect(clean(runScript), 'Команда «запустить src/index.js»').toBe('node src/index.js');
  });
});
