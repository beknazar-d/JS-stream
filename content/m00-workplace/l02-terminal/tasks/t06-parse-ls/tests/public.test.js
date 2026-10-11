import { parseLs } from './index.js';

const shopListing = `total 36
drwxr-xr-x 5 anna anna 4096 Oct  9 14:05 .
drwxr-xr-x 3 anna anna 4096 Oct 11 08:29 ..
-rw-r--r-- 1 anna anna   11 Oct  2 09:00 .env
-rw-r--r-- 1 anna anna   18 Oct  1 11:20 .gitignore
-rw-r--r-- 1 anna anna    7 Oct  9 14:05 README.md
drwxr-xr-x 2 anna anna 4096 Oct  9 14:05 docs
-rw-r--r-- 1 anna anna   58 Sep 30 09:41 hello.js
drwxr-xr-x 2 anna anna 4096 Mar  3  2026 price lists
drwxr-xr-x 2 anna anna 4096 Oct  9 13:00 src
`;

describe('parseLs: листинг проекта shop', () => {
  it('папки по порядку вывода', () => {
    expect(parseLs(shopListing).folders, 'Список папок без . и ..').toEqual(['docs', 'price lists', 'src']);
  });

  it('файлы по порядку вывода, включая скрытые', () => {
    expect(parseLs(shopListing).files, 'Список файлов').toEqual(['.env', '.gitignore', 'README.md', 'hello.js']);
  });

  it('размер считается только по файлам', () => {
    expect(parseLs(shopListing).totalBytes, 'Сумма 11 + 18 + 7 + 58').toBe(94);
  });
});
