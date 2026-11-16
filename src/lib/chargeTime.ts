import type { EVVehicle } from "@/lib/evCompatibility";

/**
 * AC charging loses energy to the onboard converter and to
 * heat. 90% is the usual real-world figure — the raw
 * battery/power division quotes times nobody achieves.
 */
const EFFICIENCY = 0.9;

/**
 * Hours to charge from `fromPercent` to `toPercent`.
 *
 * The charger's output is capped by what the car accepts: a
 * 22 kW unit charges a 7 kW car at 7 kW, which is the whole
 * point of showing this to someone choosing between units.
 */
export function chargeHours(
  vehicle: EVVehicle,
  chargerKw: number,
  fromPercent = 20,
  toPercent = 80
) {
  const effectiveKw = Math.min(chargerKw, vehicle.maxAC);
  const kwhNeeded =
    vehicle.batteryKwh * ((toPercent - fromPercent) / 100);

  return kwhNeeded / (effectiveKw * EFFICIENCY);
}

/** "6h 20m" — the form people read times in. */
export function formatChargeTime(hours: number) {
  if (!Number.isFinite(hours) || hours <= 0) return "—";

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  /* 3h 60m is wrong; round up to the next hour. */
  if (minutes === 60) return `${wholeHours + 1}h`;
  if (wholeHours === 0) return `${minutes}m`;
  if (minutes === 0) return `${wholeHours}h`;

  return `${wholeHours}h ${minutes}m`;
}