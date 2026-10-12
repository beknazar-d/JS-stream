import type { PickupPoint, PickupRequest } from './index.js';

type cases = [
  Expect<Equal<PickupPoint['floor'], number | undefined>>,
  Expect<Equal<PickupPoint['intercom'], string | undefined>>,
  Expect<Equal<PickupRequest['comment'], string | undefined>>,
];

// @ts-expect-error без груза заявка невозможна
const noCargo: PickupRequest = { id: 1, company: "А", pickup: { city: "Б", street: "В" }, contacts: [] };

// @ts-expect-error без улицы адрес неполный
const noStreet: PickupRequest = { id: 1, company: "А", pickup: { city: "Б" }, contacts: [], cargo: { places: 1, weightKg: 1 } };

// @ts-expect-error вес — число
const badWeight: PickupRequest = { id: 1, company: "А", pickup: { city: "Б", street: "В" }, contacts: [], cargo: { places: 1, weightKg: "7" } };

// @ts-expect-error контакты — массив строк
const badContacts: PickupRequest = { id: 1, company: "А", pickup: { city: "Б", street: "В" }, contacts: "+7 900", cargo: { places: 1, weightKg: 1 } };
