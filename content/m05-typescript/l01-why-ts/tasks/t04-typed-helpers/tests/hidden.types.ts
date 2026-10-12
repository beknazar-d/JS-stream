import { averageMinutes, countPaid, formatPrice } from './index.js';

// @ts-expect-error минуты — числа, строки не подходят
averageMinutes(["30", "45"]);

// @ts-expect-error нужен массив, а не одно число
averageMinutes(30);

// @ts-expect-error флаги — булевы значения
countPaid([1, 0, 1]);

// @ts-expect-error без кода валюты вызывать нельзя
formatPrice(100);

// @ts-expect-error сумма — число
formatPrice("100", "RUB");
