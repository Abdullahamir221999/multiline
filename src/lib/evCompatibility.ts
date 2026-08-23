export type EVVehicle = {
  brand: string;
  model: string;

  /** Inclusive model-year range. Set yearTo to the current year while still sold. */
  yearFrom: number;
  yearTo: number;

  /** Onboard AC charging limit in kW. */
  maxAC: number;

  /** Optional overrides for when the ranking rule picks the wrong unit. */
  pinnedProductId?: string;
  excludeProductIds?: string[];
};

export const EV_VEHICLES: EVVehicle[] = [
  {
    brand: "KIA",
    model: "EV5",
    yearFrom: 2024,
    yearTo: 2026,
    maxAC: 11,
  },

  {
    brand: "BYD",
    model: "Atto 3",
    yearFrom: 2022,
    yearTo: 2026,
    maxAC: 7,
  },

  {
    brand: "BYD",
    model: "Seal",
    yearFrom: 2023,
    yearTo: 2026,
    maxAC: 11,
  },

  {
    brand: "BMW",
    model: "iX",
    yearFrom: 2021,
    yearTo: 2026,
    maxAC: 11,
  },

  {
    brand: "Audi",
    model: "e-tron",
    yearFrom: 2019,
    yearTo: 2026,
    maxAC: 11,
  },
];