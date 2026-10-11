import { parseLs } from './index.js';

const srcListing = `total 36
drwxr-xr-x 2 anna anna  4096 Oct  9 13:00 .
drwxr-xr-x 5 anna anna  4096 Oct  9 14:05 ..
-rw-r--r-- 1 anna anna    18 Oct  8 12:10 index.js
-rw-r--r-- 1 anna anna 18321 Oct 10 17:45 orders.js
-rw-r--r-- 1 anna anna    20 Oct  8 12:10 utils.js
`;

const docsListing = `total 12
drwxr-xr-x 2 anna anna 4096 Oct  9 14:05 .
drwxr-xr-x 5 anna anna 4096 Oct  9 14:05 ..
-rw-r--r-- 1 anna anna 2345 Dec 24  2025 guide.md
`;

const emptyListing = `total 8
drwxrwxr-x  2 anna anna 4096 Oct 11 08:29 .
drwxrwxrwt 12 root root 4096 Oct 11 08:29 ..
`;

describe('parseLs: другие листинги', () => {
  it('папка src: большие размеры и выравнивание', () => {
    expect(parseLs(srcListing), 'Листинг папки src').toEqual({
      folders: [],
      files: ['index.js', 'orders.js', 'utils.js'],
      totalBytes: 18359,
    });
  });

  it('год вместо времени в строке не ломает разбор', () => {
    expect(parseLs(docsListing), 'Листинг папки docs, дата с годом').toEqual({
      folders: [],
      files: ['guide.md'],
      totalBytes: 2345,
    });
  });
});

describe('parseLs: краевые случаи', () => {
  it('пустая папка', () => {
    expect(parseLs(emptyListing), 'Листинг пустой папки').toEqual({ folders: [], files: [], totalBytes: 0 });
  });

  it('вывод без перевода строки в конце', () => {
    const text = srcListing.trimEnd();
    expect(parseLs(text).files, 'Вывод без завершающего перевода строки').toHaveLength(3);
  });

  it('имя файла с несколькими словами', () => {
    const text = 'total 4\n-rw-r--r-- 1 anna anna 120 Oct  9 14:05 may 2026 report.csv\n';
    expect(parseLs(text), 'Имя из трёх слов').toEqual({ folders: [], files: ['may 2026 report.csv'], totalBytes: 120 });
  });

  it('пустая строка вместо вывода', () => {
    expect(parseLs(''), 'Пустой вывод').toEqual({ folders: [], files: [], totalBytes: 0 });
  });
});
