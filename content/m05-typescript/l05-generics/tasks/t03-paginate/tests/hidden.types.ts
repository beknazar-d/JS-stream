import { paginate, type Page } from './index.js';

const numbers = paginate([1, 2, 3], 1, 2);
const empty = paginate<boolean>([], 1, 10);
const mixed = paginate([{ sku: 'TV-1', qty: 3 }], 1, 5);

type cases = [
  Expect<Equal<typeof numbers, Page<number>>>,
  Expect<Equal<typeof empty, Page<boolean>>>,
  Expect<Equal<typeof mixed, Page<{ sku: string; qty: number }>>>,
  ExpectFalse<Equal<typeof numbers, Page<any>>>,
];

// @ts-expect-error номер страницы должен быть числом
paginate([1, 2, 3], '1', 2);
