export type EVVehicle = {
  brand: string;
  model: string;
  year: number;

  maxAC: number;

  recommendedProductIds: string[];
};

export const EV_VEHICLES: EVVehicle[] = [
  {
    brand: "KIA",
    model: "EV5",
    year: 2026,
    maxAC: 11,
    recommendedProductIds: ["11kw-ac", "7kw-ac"],
  },

  {
    brand: "BYD",
    model: "Atto 3",
    year: 2025,
    maxAC: 7,
    recommendedProductIds: ["7kw-ac", "11kw-ac"],
  },

  {
    brand: "BYD",
    model: "Seal",
    year: 2025,
    maxAC: 11,
    recommendedProductIds: ["11kw-ac", "22kw-ac"],
  },

  {
    brand: "BMW",
    model: "iX",
    year: 2025,
    maxAC: 11,
    recommendedProductIds: ["11kw-ac", "22kw-ac"],
  },

  {
    brand: "Audi",
    model: "e-tron",
    year: 2024,
    maxAC: 11,
    recommendedProductIds: ["11kw-ac", "22kw-ac"],
  },
];