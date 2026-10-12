export interface DeliverySettings {
  baseFee: number;
  perKg: number;
  freeFrom: number;
  currency: 'RUB' | 'EUR';
  note?: string;
}

// PLAT-130: каждый вид настроек получен из DeliverySettings.
export type SettingsOverride = Partial<DeliverySettings>;
export type ResolvedSettings = Readonly<Required<DeliverySettings>>;
export type PublicSettings = Pick<ResolvedSettings, 'baseFee' | 'perKg' | 'currency'>;
export type CalcFeeArgs = Parameters<typeof calcFee>;
export type Fee = ReturnType<typeof calcFee>;

export const defaultSettings: ResolvedSettings = {
  baseFee: 100,
  perKg: 10,
  freeFrom: 5000,
  currency: 'RUB',
  note: 'общий тариф',
};

export function resolveSettings(defaults: ResolvedSettings, override: SettingsOverride): ResolvedSettings {
  return {
    baseFee: override.baseFee ?? defaults.baseFee,
    perKg: override.perKg ?? defaults.perKg,
    freeFrom: override.freeFrom ?? defaults.freeFrom,
    currency: override.currency ?? defaults.currency,
    note: override.note ?? defaults.note,
  };
}

export function publicSettings(settings: ResolvedSettings): PublicSettings {
  return { baseFee: settings.baseFee, perKg: settings.perKg, currency: settings.currency };
}

export function calcFee(settings: ResolvedSettings, weightKg: number, orderTotal: number): number {
  if (orderTotal >= settings.freeFrom) {
    return 0;
  }
  return settings.baseFee + settings.perKg * weightKg;
}
