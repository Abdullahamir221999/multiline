/**
 * Estimate EV charge duration in hours from battery capacity and power draw.
 */
export const formatChargeTime = ({
  batteryKwh,
  powerKw,
  startPercent,
  targetPercent,
  efficiency = 0.9,
}: {
  batteryKwh: number;
  powerKw: number;
  startPercent: number;
  targetPercent: number;
  efficiency?: number;
}): number => {
  const delta = Math.max(targetPercent - startPercent, 1);
  const energy = batteryKwh * (delta / 100);
  const safePower = Math.max(powerKw * efficiency, 0.1);
  return energy / safePower;
};

export const formatHoursAsReadable = (hours: number): string => {
  if (!Number.isFinite(hours) || hours <= 0) {
    return "—";
  }

  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (h === 0) {
    return `${m} min`;
  }

  if (m === 0) {
    return `${h} h`;
  }

  return `${h} h ${m} min`;
};
