import { loadShipment } from './index.js';

const shipment = { id: 'S-1001', status: 'in_transit', weightKg: 2.5, courier: { id: 7, name: 'Анна' } };
const response = (body: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

describe('loadShipment', () => {
  it('возвращает отправление и просит нужный адрес', async () => {
    const fetchLike = fn(async () => response(shipment));
    const result = await loadShipment(fetchLike, 'S-1001');
    expect(result, 'Успешный ответ превращается в ok: true').toEqual({ ok: true, value: shipment });
    expect(fetchLike).toHaveBeenCalledTimes(1);
    expect(fetchLike).toHaveBeenCalledWith('/shipments/S-1001');
  });

  it('ответ 404 — ошибка http', async () => {
    const result = await loadShipment(async () => response({}, 404), 'S-9');
    expect(result, 'Статус 404').toEqual({ ok: false, error: { kind: 'http', status: 404 } });
  });

  it('обрыв связи — ошибка network', async () => {
    const result = await loadShipment(async () => {
      throw new Error('offline');
    }, 'S-1');
    expect(result, 'Отклонённый fetchLike').toEqual({ ok: false, error: { kind: 'network', message: 'offline' } });
  });
});
