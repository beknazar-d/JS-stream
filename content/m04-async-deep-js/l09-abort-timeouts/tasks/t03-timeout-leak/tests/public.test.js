import { withTimeout } from './index.js';
import { slowLoad, track } from './helpers.js';

describe('withTimeout: успех', () => {
  it('возвращает результат и очищает таймер', async () => {
    timers.useFake();
    const state = track(withTimeout(slowLoad(200, ['Пункт на Тверской']), 5000));
    await timers.advance(200);
    expect(state(), 'Ответ пришёл за 200 мс из 5000').toEqual({ value: ['Пункт на Тверской'] });
    expect(timers.pending(), 'Таймер таймаута должен быть очищен после ответа').toBe(0);
  });
});

describe('withTimeout: таймаут', () => {
  it('отклоняется с понятным текстом и отменяет сигнал', async () => {
    timers.useFake();
    const seen = {};
    const state = track(withTimeout(slowLoad(60000, 'поздно', seen), 5000));
    await timers.advance(4999);
    expect(state(), 'За миллисекунду до таймаута промис ещё ждёт').toBe('ожидание');
    await timers.advance(1);
    expect(state().error?.message, 'Текст ошибки таймаута').toBe('Таймаут: 5000 мс');
    expect(seen.signal.aborted, 'Зависшему запросу нужно отменить сигнал').toBe(true);
  });
});
