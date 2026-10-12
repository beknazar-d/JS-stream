import type { Order } from './index.js';

declare const order: Order;

// @ts-expect-error номер заказа только для чтения
order.id = 5;

// @ts-expect-error у заказа должен быть клиент
const noCustomer: Order = { id: 1, address: { city: "Казань", street: "Баумана 5" }, paid: true };

// @ts-expect-error у заказа должен быть адрес
const noAddress: Order = { id: 1, customer: "Анна", paid: true };

// @ts-expect-error у адреса должна быть улица
const noStreet: Order = { id: 1, customer: "Анна", address: { city: "Казань" }, paid: true };
