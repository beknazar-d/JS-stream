import { isShipmentStatus, type ShipmentStatus } from './index.js';

// Если isShipmentStatus объявлена охранником типа, компилятор сужает unknown до ShipmentStatus.
// Иначе строка с return value получит ошибку TS2322.
function narrow(value: unknown): ShipmentStatus | null {
  return isShipmentStatus(value) ? value : null;
}

type cases = [Expect<Equal<typeof isShipmentStatus, (value: unknown) => value is ShipmentStatus>>];
