const raw = '{"id":"S-17","weightKg":"2.5","courier":null}';
const shipment = JSON.parse(raw) as { id: string; weightKg: number; courier: { name: string } | null };

console.log(typeof shipment.weightKg);
console.log(shipment.weightKg * 2);
console.log(shipment.weightKg + 2);
console.log(shipment.courier);
console.log(shipment.courier?.name);
console.log((shipment as unknown as { status: string }).status);
console.log(typeof JSON.parse('null'));
