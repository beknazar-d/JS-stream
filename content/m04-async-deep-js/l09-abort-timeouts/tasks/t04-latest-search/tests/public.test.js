import { createSuggester } from './index.js';
import { createGeocoder, track } from './helpers.js';

describe('createSuggester', () => {
  it('одиночный запрос возвращает подсказки', async () => {
    timers.useFake();
    const geo = createGeocoder({ 'Казань': 100 });
    const state = track(createSuggester(geo.load)('Казань'));
    await timers.advance(100);
    expect(state(), 'Результат единственного запроса').toEqual({ value: ['Казань: улица Баумана'] });
  });

  it('новый вызов сразу отменяет сигнал предыдущего', async () => {
    timers.useFake();
    const geo = createGeocoder({ 'Каз': 300, 'Казань': 100 });
    const suggest = createSuggester(geo.load);
    track(suggest('Каз'));
    expect(geo.calls[0].signal.aborted, 'Пока вызов один, сигнал живой').toBe(false);
    track(suggest('Казань'));
    expect(geo.calls[0].signal.aborted, 'Второй вызов отменяет первый немедленно').toBe(true);
    expect(geo.calls[1].signal.aborted, 'Свежий сигнал не отменён').toBe(false);
  });

  it('устаревший вызов отклоняется AbortError, свежий получает результат', async () => {
    timers.useFake();
    const geo = createGeocoder({ 'Каз': 300, 'Казань': 100 });
    const suggest = createSuggester(geo.load);
    const stale = track(suggest('Каз'));
    const fresh = track(suggest('Казань'));
    await timers.advance(100);
    expect(stale().error?.name, 'Устаревший вызов отклонён сразу, не дожидаясь 300 мс').toBe('AbortError');
    expect(fresh(), 'Свежий вызов получил свой результат').toEqual({ value: ['Казань: улица Баумана'] });
  });
});
