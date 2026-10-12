import { createRepository, type Repository } from './index.js';

interface StockEvent {
  id: number;
  sku: string;
  delta: number;
}

interface Courier {
  id: string;
  name: string;
}

const events = createRepository<StockEvent>();
const couriers = createRepository<Courier, string>();
const found = couriers.get('c-17');

type cases = [
  Expect<Equal<typeof events, Repository<StockEvent>>>,
  Expect<Equal<typeof couriers, Repository<Courier, string>>>,
  Expect<Equal<typeof found, Courier | undefined>>,
  Expect<Equal<ReturnType<typeof events.list>, StockEvent[]>>,
];

// @ts-expect-error у курьера id строка, а Id по умолчанию — number
createRepository<Courier>();

// @ts-expect-error идентификатор события — число
events.get('1');
