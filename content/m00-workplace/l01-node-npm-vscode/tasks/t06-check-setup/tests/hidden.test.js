import { checkSetup } from './index.js';

const NODE_MISSING = 'Node.js не найден. Установите версию LTS с nodejs.org и откройте новый терминал.';
const NPM_MISSING = 'npm не найден. Он ставится вместе с Node.js: переустановите Node.js.';

describe('checkSetup: несколько проблем', () => {
  it('не найдены и Node.js, и npm: два сообщения по порядку', () => {
    expect(
      checkSetup('bash: node: command not found', 'bash: npm: command not found', 22),
      'Оба вывода — тексты ошибок',
    ).toEqual([NODE_MISSING, NPM_MISSING]);
  });

  it('Node.js устарел и npm не найден', () => {
    expect(checkSetup('v20.11.1', '', 22), 'Node.js 20 при минимуме 22 и пустой вывод npm').toEqual([
      'Node.js 20 устарел: нужна версия 22 или новее.',
      NPM_MISSING,
    ]);
  });
});

describe('checkSetup: краевые случаи', () => {
  it('версия ровно равна минимуму подходит', () => {
    expect(checkSetup('v22.0.0', '10.9.4', 22), 'Node.js ровно 22').toEqual([]);
  });

  it('однозначная версия меньше двузначного минимума', () => {
    expect(checkSetup('v8.17.0', '6.13.4', 22), 'Node.js 8 при минимуме 22').toEqual(['Node.js 8 устарел: нужна версия 22 или новее.']);
  });

  it('пробелы и перевод строки по краям не мешают', () => {
    expect(checkSetup(' v22.22.0\n', '10.9.4\n', 22), 'Вывод с пробелами и переводом строки').toEqual([]);
  });

  it('в сообщении используются реальные числа', () => {
    expect(checkSetup('v16.20.2', '8.19.4', 24), 'Node.js 16 при минимуме 24').toEqual(['Node.js 16 устарел: нужна версия 24 или новее.']);
  });

  it('пустой вывод Node.js — не найден', () => {
    expect(checkSetup('', '10.9.4', 22), 'Пустой вывод node -v').toEqual([NODE_MISSING]);
  });
});
