// Import the real list from the website's data layer rather than duplicating it.
// import { EV_VEHICLES } from '@/lib/ev-data';
const EV_VEHICLES: { id: string; name: string }[] = [];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Customers type "atto3", "BYD Atto 3", "byd atto three". Store the raw string
 * and this normalised match side by side — never overwrite what they typed.
 */
export function matchVehicle(input: string): string | null {
  const n = norm(input);
  if (!n) return null;
  const exact = EV_VEHICLES.find((v) => norm(v.name) === n);
  if (exact) return exact.name;
  const partial = EV_VEHICLES.find((v) => norm(v.name).includes(n) || n.includes(norm(v.name)));
  return partial?.name ?? null;
}