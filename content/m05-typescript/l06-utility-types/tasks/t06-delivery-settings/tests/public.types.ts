import { calcFee, defaultSettings, publicSettings, resolveSettings } from './index.js';
import type { CalcFeeArgs, DeliverySettings, Fee, PublicSettings, ResolvedSettings, SettingsOverride } from './index.js';

type cases = [
  Expect<Equal<SettingsOverride, { baseFee?: number; perKg?: number; freeFrom?: number; currency?: 'RUB' | 'EUR'; note?: string }>>,
  Expect<Equal<ResolvedSettings, { readonly baseFee: number; readonly perKg: number; readonly freeFrom: number; readonly currency: 'RUB' | 'EUR'; readonly note: string }>>,
  Expect<Equal<PublicSettings, { readonly baseFee: number; readonly perKg: number; readonly currency: 'RUB' | 'EUR' }>>,
  Expect<Equal<CalcFeeArgs, [settings: ResolvedSettings, weightKg: number, orderTotal: number]>>,
  Expect<Equal<Fee, number>>,
  Expect<Equal<ReturnType<typeof resolveSettings>, ResolvedSettings>>,
  Expect<Equal<ReturnType<typeof publicSettings>, PublicSettings>>,
];

// Переопределение можно задавать по одному полю.
const urals = resolveSettings(defaultSettings, { perKg: 20 });
calcFee(urals, 2, 100);
resolveSettings(defaultSettings, {});

// @ts-expect-error неизвестное поле в переопределении
resolveSettings(defaultSettings, { weekendFee: 1 });

// @ts-expect-error итоговые настройки нельзя менять
urals.perKg = 5;

declare const settings: DeliverySettings;
settings.baseFee = 1;
