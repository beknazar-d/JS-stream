import { countByStatus, statusLabels, type DeliveryStatus } from './index.js';

const counters = countByStatus([]);

type cases = [
  Expect<Equal<typeof statusLabels, Record<DeliveryStatus, string>>>,
  Expect<Equal<typeof counters, Record<DeliveryStatus, number>>>,
];
