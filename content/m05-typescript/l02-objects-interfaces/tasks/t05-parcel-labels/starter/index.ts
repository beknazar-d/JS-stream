export interface Address {
  city: string;
  street: string;
  apartment?: number;
}

export interface Parcel {
  readonly id: number;
  recipient: string;
  address: Address;
  weightKg: number;
  fragile?: boolean;
  note?: string;
}

// Опишите Summary: count, totalWeightKg, fragileCount.

export function formatLabel(parcel: Parcel): string {
  // ваш код
}

export function summarize(parcels: Parcel[]): Summary {
  // ваш код
}
