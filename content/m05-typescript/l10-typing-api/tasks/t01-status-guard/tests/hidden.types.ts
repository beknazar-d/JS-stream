import { isShipmentStatus } from './index.js';

type cases = [Expect<Equal<Parameters<typeof isShipmentStatus>, [value: unknown]>>];
