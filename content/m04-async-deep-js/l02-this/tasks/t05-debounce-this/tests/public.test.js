import { debounce } from './index.js';

describe('debounce: основное', () => {
  it('серия вызовов даёт один вызов с последними аргументами', async () => {
    timers.useFake();
    const handler = fn();
    const search = debounce(handler, 300);
    search('ч');
    await timers.advance(100);
    search('чай');
    await timers.advance(100);
    search('чайник');
    await timers.advance(299);
    expect(handler, 'До конца паузы после последнего вызова').not.toHaveBeenCalled();
    await timers.advance(1);
    expect(handler, 'Ровно один вызов').toHaveBeenCalledTimes(1);
    expect(handler, 'Аргументы последнего вызова').toHaveBeenCalledWith('чайник');
  });

  it('сохраняет this метода', async () => {
    timers.useFake();
    const searchBox = {
      queries: [],
      onInput: debounce(function (text) {
        this.queries.push(text);
      }, 200),
    };
    searchBox.onInput('чайник');
    await timers.advance(200);
    expect(searchBox.queries, 'Метод выполнился с this равным searchBox').toEqual(['чайник']);
  });
});
