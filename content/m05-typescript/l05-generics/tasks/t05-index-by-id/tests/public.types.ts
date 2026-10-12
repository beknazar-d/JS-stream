import { findById, indexById } from './index.js';

interface Parcel {
  id: number;
  weightKg: number;
  status: 'new' | 'shipped';
}

declare const parcels: Parcel[];

const parcel = findById(parcels, 7);
const index = indexById(parcels);

type cases = [
  Expect<Equal<typeof parcel, Parcel | undefined>>,
  Expect<Equal<typeof index, Map<number, Parcel>>>,
];
