import { describeParcel } from './index.js';

describe('describeParcel: другие значения', () => {
  it('целый вес и большой номер', () => {
    expect(describeParcel(100500, 12), 'Посылка 100500 весом 12 кг').toBe('Посылка №100500, 12 кг');
  });

  it('нулевой вес не пропадает', () => {
    expect(describeParcel(1, 0), 'Вес 0').toBe('Посылка №1, 0 кг');
  });
});
