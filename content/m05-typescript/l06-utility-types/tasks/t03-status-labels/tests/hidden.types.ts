import { statusLabels, labelOf, type DeliveryStatus } from './index.js';

type cases = [
  Expect<Equal<keyof typeof statusLabels, DeliveryStatus>>,
  Expect<Equal<ReturnType<typeof labelOf>, string>>,
  Expect<Equal<Parameters<typeof labelOf>, [status: DeliveryStatus]>>,
];

// @ts-expect-error такого статуса нет
labelOf('lost');

// @ts-expect-error обращение к несуществующему ключу справочника
statusLabels.lost;
