import { loadShipment } from './index.js';

const response = (body: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

describe('loadShipment: скрытые случаи', () => {
  it('кодирует идентификатор в адресе', async () => {
    const fetchLike = fn(async () => response({}, 404));
    await loadShipment(fetchLike, 'S 17/1');
    expect(fetchLike, 'Пробел и косая черта кодируются').toHaveBeenCalledWith('/shipments/S%2017%2F1');
  });

  it('вес строкой — ошибка invalid со списком проблем', async () => {
    const body = { id: 'S-1', status: 'created', weightKg: '2.5', courier: null };
    const result = await loadShipment(async () => response(body), 'S-1');
    expect(result, 'Тело не прошло разбор').toEqual({
      ok: false,
      error: { kind: 'invalid', problems: ['weightKg: ожидалось число больше нуля'] },
    });
  });

  it('ответ не JSON — ошибка invalid', async () => {
    const broken = {
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('Unexpected token < in JSON');
      },
    };
    const result = await loadShipment(async () => broken, 'S-1');
    expect(result, 'json() отклонён').toEqual({ ok: false, error: { kind: 'invalid', problems: ['ответ: не JSON'] } });
  });

  it('при плохом статусе тело не читается', async () => {
    const json = fn(async () => ({}));
    const result = await loadShipment(async () => ({ ok: false, status: 503, json }), 'S-1');
    expect(result).toEqual({ ok: false, error: { kind: 'http', status: 503 } });
    expect(json, 'json() не вызывается при ok: false').not.toHaveBeenCalled();
  });

  it('отклонение не-Error превращается в строку', async () => {
    const result = await loadShipment(async () => Promise.reject('timeout'), 'S-1');
    expect(result).toEqual({ ok: false, error: { kind: 'network', message: 'timeout' } });
  });

  it('промис никогда не отклоняется', async () => {
    await expect(loadShipment(async () => Promise.reject(new TypeError('Failed to fetch')), 'S-1')).resolves.toBeDefined();
  });
});
