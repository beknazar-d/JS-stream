import { parseRow, importRows, ValidationError } from './index.js';

const catalog = { 'A-100': { sku: 'A-100', price: 1200 } };
const findProduct = (sku) => catalog[sku];

describe('parseRow: артикул и количество из файла', () => {
  it('очищает пробелы вокруг артикула и количества', () => {
    expect(parseRow({ sku: '  A-100 ', qty: ' 3 ' }, findProduct), 'Строка с пробелами').toEqual({ sku: 'A-100', qty: 3, total: 3600 });
  });

  it('пустой артикул', () => {
    expect(() => parseRow({ sku: '   ', qty: '1' }, findProduct), 'Артикул из пробелов').toThrow('Не указан артикул');
  });

  for (const text of ['', '0', '-1', '2.5', 'abc', '1e1x']) {
    it(`отклоняет количество «${text}»`, () => {
      expect(() => parseRow({ sku: 'A-100', qty: text }, findProduct), `Количество «${text}»`).toThrow('Количество должно быть целым числом больше нуля');
    });
  }

  it('сначала артикул, потом количество, потом справочник', () => {
    const spy = fn();
    expect(() => parseRow({ sku: '', qty: 'abc' }, spy), 'Плохи и артикул, и количество').toThrow('Не указан артикул');
    expect(() => parseRow({ sku: 'X', qty: '0' }, spy), 'Плохо количество, артикул не из справочника').toThrow('Количество');
    expect(spy, 'Справочник не должен вызываться, пока строка не прошла простые проверки').not.toHaveBeenCalled();
  });

  it('ошибка относится к своему классу', () => {
    expect(() => parseRow({ sku: 'Z', qty: '1' }, findProduct), 'Неизвестный артикул').toThrow(ValidationError);
  });
});

describe('importRows: полный отчёт', () => {
  it('пустой список', () => {
    expect(importRows([], findProduct), 'Пустая выгрузка').toEqual({ valid: [], errors: [] });
  });

  it('все строки плохие: проверяются все, номера идут с единицы', () => {
    const rows = [{ sku: '', qty: '1' }, { sku: 'A-100', qty: '0' }, { sku: 'Q-1', qty: '1' }];
    expect(importRows(rows, findProduct).errors, 'Три плохие строки').toEqual([
      { row: 1, message: 'Не указан артикул' },
      { row: 2, message: 'Количество должно быть целым числом больше нуля' },
      { row: 3, message: 'Неизвестный артикул: Q-1' },
    ]);
  });

  it('порядок хороших строк сохраняется', () => {
    const rows = [{ sku: 'A-100', qty: '1' }, { sku: 'bad', qty: '1' }, { sku: 'A-100', qty: '2' }];
    expect(importRows(rows, findProduct).valid.map((item) => item.qty), 'Количества в порядке строк').toEqual([1, 2]);
  });
});

describe('importRows: чужие ошибки не прячутся', () => {
  it('поломка справочника пробрасывается', () => {
    const broken = () => {
      throw new Error('База товаров недоступна');
    };
    expect(() => importRows([{ sku: 'A-100', qty: '1' }], broken), 'Справочник бросает Error').toThrow('База товаров недоступна');
  });

  it('строка null — баг вызывающего кода, а не ошибка строки', () => {
    expect(() => importRows([null], findProduct), 'В выгрузке попался null').toThrow(TypeError);
  });
});
