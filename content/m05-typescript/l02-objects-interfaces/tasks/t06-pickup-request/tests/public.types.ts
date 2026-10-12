import type { Cargo, PickupPoint, PickupRequest } from './index.js';

type cases = [
  Expect<Equal<Cargo, { places: number; weightKg: number }>>,
  Expect<Equal<PickupPoint['city'], string>>,
  Expect<Equal<PickupPoint['street'], string>>,
  Expect<Equal<PickupRequest['id'], number>>,
  Expect<Equal<PickupRequest['company'], string>>,
  Expect<Equal<PickupRequest['pickup'], PickupPoint>>,
  Expect<Equal<PickupRequest['contacts'], string[]>>,
  Expect<Equal<PickupRequest['cargo'], Cargo>>,
];

// Обе заявки из письма должны проходить проверку.
const first: PickupRequest = {
  id: 501,
  company: "ООО Ромашка",
  pickup: { city: "Казань", street: "Чехова 3", floor: 4, intercom: "К1234" },
  contacts: ["+7 900 111-22-33", "+7 900 111-22-44"],
  cargo: { places: 3, weightKg: 41.5 },
  comment: "заезд со двора",
};
const second: PickupRequest = {
  id: 502,
  company: "ИП Лис",
  pickup: { city: "Самара", street: "Ленина 1" },
  contacts: [],
  cargo: { places: 1, weightKg: 7 },
};
