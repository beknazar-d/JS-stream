// Напишите тесты для memoize. Мок-функцию с подсчётом вызовов делает fn:
// const calc = fn((x) => x * 2);
// const fast = memoize(calc);
// fast(2); fast(2);
// expect(calc).toHaveBeenCalledTimes(1);
import { memoize } from './index.js';
