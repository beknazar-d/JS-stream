export interface DeliverySettings {
  baseFee: number;
  perKg: number;
  freeFrom: number;
  currency: 'RUB' | 'EUR';
  note?: string;
}

// PLAT-130: пока все виды настроек — один и тот же интерфейс.
export type SettingsOverride = DeliverySettings;
export type ResolvedSettings = DeliverySettings;
export type PublicSettings = DeliverySettings;
export type CalcFeeArgs = unknown[];
export type Fee = unknown;

export const defaultSettings: ResolvedSettings = {
  baseFee: 100,
  perKg: 10,
  freeFrom: 5000,
  currency: 'RUB',
  note: 'общий тариф',
};

export function resolveSettings(defaults: ResolvedSettings, override: SettingsOverride): ResolvedSettings {
  throw new Error('Не реализовано');
}

export function publicSettings(settings: ResolvedSettings): PublicSettings {
  throw new Error('Не реализовано');
}

export function calcFee(settings: ResolvedSettings, weightKg: number, orderTotal: number): number {
  throw new Error('Не реализовано');
}
