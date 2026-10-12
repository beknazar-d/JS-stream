import { deliveryPrice, receipt, totalForOrders } from './index.js';

// @ts-expect-error вес — число, строку из формы нужно превратить заранее
deliveryPrice("центр", "5", false);

// @ts-expect-error флаг экспресса обязателен
deliveryPrice("центр", 5);

// @ts-expect-error цены — массив чисел
totalForOrders("100,250");

// @ts-expect-error номер заказа — число
receipt("A-7", [100], "RUB");
