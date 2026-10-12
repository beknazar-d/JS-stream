import { loadDiscount } from './index.js';

describe('loadDiscount', () => {
  it('промокод SPRING даёт 10%', async () => {
    timers.useFake();
    const onReady = fn();
    loadDiscount('SPRING', onReady);
    await timers.runAll();
    expect(onReady, 'Колбэк после таймера').toHaveBeenCalledWith(10);
  });

  it('промокод VIP даёт 20%', async () => {
    timers.useFake();
    const onReady = fn();
    loadDiscount('VIP', onReady);
    await timers.runAll();
    expect(onReady, 'Колбэк после таймера').toHaveBeenCalledWith(20);
  });
});
