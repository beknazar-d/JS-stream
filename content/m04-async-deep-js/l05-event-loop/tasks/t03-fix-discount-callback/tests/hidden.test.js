import { loadDiscount } from './index.js';

describe('Контракт колбэка', () => {
  it('для неизвестного промокода приходит 0', async () => {
    timers.useFake();
    const onReady = fn();
    loadDiscount('NOPE', onReady);
    await timers.runAll();
    expect(onReady, 'Неизвестный код').toHaveBeenCalledWith(0);
  });

  it('колбэк вызывается ровно один раз', async () => {
    timers.useFake();
    const onReady = fn();
    loadDiscount('SPRING', onReady);
    await timers.runAll();
    expect(onReady, 'Количество вызовов').toHaveBeenCalledTimes(1);
  });

  it('колбэк не вызывается синхронно', async () => {
    timers.useFake();
    const onReady = fn();
    loadDiscount('SPRING', onReady);
    expect(onReady, 'Сразу после вызова loadDiscount').not.toHaveBeenCalled();
    await timers.runAll();
  });

  it('пустой промокод даёт 0', async () => {
    timers.useFake();
    const onReady = fn();
    loadDiscount('', onReady);
    await timers.runAll();
    expect(onReady, 'Пустая строка').toHaveBeenCalledWith(0);
  });
});
