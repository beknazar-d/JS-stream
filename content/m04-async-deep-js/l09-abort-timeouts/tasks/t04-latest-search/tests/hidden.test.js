import { createSuggester } from './index.js';
import { createGeocoder, track } from './helpers.js';

describe('createSuggester: краевые случаи', () => {
  it('load, который игнорирует сигнал, всё равно даёт AbortError', async () => {
    timers.useFake();
    const geo = createGeocoder({ 'Каз': 300, 'Казань': 100 }, { listensToSignal: false });
    const suggest = createSuggester(geo.load);
    const stale = track(suggest('Каз'));
    const fresh = track(suggest('Казань'));
    await timers.advance(300);
    expect(stale().error?.name, 'Старый ответ пришёл, но вызов устарел').toBe('AbortError');
    expect(fresh(), 'Свежий ответ получен').toEqual({ value: ['Казань: улица Баумана'] });
  });

  it('завершённый вызов не отменяется следующим', async () => {
    timers.useFake();
    const geo = createGeocoder({ 'Каз': 50, 'Казань': 50 });
    const suggest = createSuggester(geo.load);
    const first = track(suggest('Каз'));
    await timers.advance(50);
    const second = track(suggest('Казань'));
    await timers.advance(50);
    expect(first(), 'Первый вызов завершился до второго').toEqual({ value: ['Каз: улица Баумана'] });
    expect(second(), 'Второй вызов тоже завершился').toEqual({ value: ['Казань: улица Баумана'] });
  });

  it('три вызова подряд: живёт только последний', async () => {
    timers.useFake();
    const geo = createGeocoder({ 'К': 400, 'Ка': 300, 'Каз': 200 });
    const suggest = createSuggester(geo.load);
    const a = track(suggest('К'));
    const b = track(suggest('Ка'));
    const c = track(suggest('Каз'));
    await timers.advance(200);
    expect(a().error?.name, 'Первый отменён').toBe('AbortError');
    expect(b().error?.name, 'Второй отменён').toBe('AbortError');
    expect(c(), 'Третий получил подсказки').toEqual({ value: ['Каз: улица Баумана'] });
    expect(timers.pending(), 'Отменённые запросы не оставили таймеров').toBe(0);
  });

  it('ошибка последнего запроса доходит до вызывающего кода', async () => {
    const failure = new Error('geocoder: 502');
    const suggest = createSuggester(() => Promise.reject(failure));
    await expect(suggest('Каз'), 'Ошибка load без изменений').rejects.toBe(failure);
  });
});
