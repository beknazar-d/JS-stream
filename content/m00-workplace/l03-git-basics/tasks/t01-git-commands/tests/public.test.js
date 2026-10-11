import { initRepo, showStatus, stageAll, makeCommit, showHistory, firstPush } from './index.js';

const clean = (command) => String(command).trim().replace(/\s+/g, ' ');

describe('Команды Git', () => {
  it('создать репозиторий', () => {
    expect(clean(initRepo), 'Команда «создать репозиторий»').toMatch(/^git init( -b main)?$/);
  });

  it('показать состояние', () => {
    expect(clean(showStatus), 'Команда «показать состояние»').toBe('git status');
  });

  it('положить всё в индекс', () => {
    expect(clean(stageAll), 'Команда «добавить всё в индекс»').toBe('git add .');
  });

  it('сделать коммит с подписью', () => {
    expect(clean(makeCommit), 'Команда коммита. Подпись задаётся ключом -m и берётся в кавычки').toMatch(/^git commit -m ("[^"]+"|'[^']+')$/);
  });

  it('показать историю одной строкой на коммит', () => {
    expect(clean(showHistory), 'Команда «показать историю»').toBe('git log --oneline');
  });

  it('первая отправка на GitHub', () => {
    expect(clean(firstPush), 'Команда первой отправки: ключ -u, имя origin, ветка main').toBe('git push -u origin main');
  });
});
