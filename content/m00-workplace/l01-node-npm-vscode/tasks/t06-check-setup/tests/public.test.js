import { checkSetup } from './index.js';

const NODE_MISSING = 'Node.js не найден. Установите версию LTS с nodejs.org и откройте новый терминал.';
const NPM_MISSING = 'npm не найден. Он ставится вместе с Node.js: переустановите Node.js.';

describe('checkSetup', () => {
  it('нормальное окружение: проблем нет', () => {
    expect(checkSetup('v22.22.0', '10.9.4', 22), 'Node.js 22 и npm 10 при минимуме 22').toEqual([]);
  });

  it('Node.js не найден', () => {
    expect(checkSetup('bash: node: command not found', '10.9.4', 22), 'Вместо версии текст ошибки').toEqual([NODE_MISSING]);
  });

  it('Node.js устарел', () => {
    expect(checkSetup('v18.19.0', '10.2.3', 22), 'Node.js 18 при минимуме 22').toEqual(['Node.js 18 устарел: нужна версия 22 или новее.']);
  });

  it('npm не найден', () => {
    expect(checkSetup('v22.22.0', 'bash: npm: command not found', 22), 'Вместо версии npm текст ошибки').toEqual([NPM_MISSING]);
  });
});
