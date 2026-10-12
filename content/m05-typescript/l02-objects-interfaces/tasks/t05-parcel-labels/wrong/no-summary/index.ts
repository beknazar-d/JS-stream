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

export interface Summary {
  count: number;
  totalWeightKg: number;
  fragileCount: number;
}

export function formatLabel(parcel: Parcel): string {
  const { city, street, apartment } = parcel.address;
  let place = `№${parcel.id} ${parcel.recipient}, ${city}, ${street}`;
  if (apartment !== undefined) {
    place = `${place}, кв. ${apartment}`;
  }

  const parts: string[] = [place, `${parcel.weightKg} кг`];
  if (parcel.fragile === true) {
    parts.push("ХРУПКОЕ");
  }
  if (parcel.note !== undefined) {
    parts.push(parcel.note);
  }
  return parts.join(" — ");
}

export function summarize(parcels: Parcel[]): Summary {
  return { count: 0, totalWeightKg: 0, fragileCount: 0 };
}
