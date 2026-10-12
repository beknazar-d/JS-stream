import { loadShipment, type FetchLike } from './index.js';

// Настоящий fetchLike возвращает ответ с ok, status и json().
const okFetch: FetchLike = async () => ({ ok: true, status: 200, json: async () => ({}) });
void loadShipment(okFetch, 'S-1');

// @ts-expect-error fetchLike обязан вернуть промис ответа, а не строку
const brokenFetch: FetchLike = async () => 'ответ';
