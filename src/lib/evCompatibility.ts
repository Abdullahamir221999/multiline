export type EVVehicle = {
  brand: string;
  model: string;

  /**
   * Usable battery capacity in kWh. Where the source gave a
   * gross/net pair the net figure is used, since that's what
   * actually goes into the car.
   */
  batteryKwh: number;

  /** Highest AC rate the car's onboard charger accepts. */
  maxAC: number;

  /** Type 1 only appears on the JDM Taycan. Everything else is Type 2. */
  connector?: "Type 1" | "Type 2";

  /** Shown beside the model where a variant changes the figures. */
  variant?: string;

  pinnedProductId?: string;
  excludeProductIds?: string[];
};

/* =========================================================
    PAKISTAN MARKET VEHICLES

    Source: Multiline's own market list. Battery figures are
    usable capacity; max AC is the onboard charger's ceiling,
    which is what decides whether a bigger charger helps.

    Worth knowing when reading this: almost everything sold
    here caps at 7 kW. The 11 kW units only pay off on the
    Audis, the GWM ORA 07, the Omoda E5, the Jaecoo J5 and
    the Sealion 7 — and only the European Taycan can use 22 kW.
========================================================= */

export const EV_VEHICLES: EVVehicle[] = [
  /* ===== AUDI ===== */
  { brand: "Audi", model: "Q6 e-tron", batteryKwh: 75.8, maxAC: 11 },
  {
    brand: "Audi",
    model: "Q6 e-tron",
    variant: "Performance quattro",
    batteryKwh: 94.9,
    maxAC: 11,
  },
  { brand: "Audi", model: "A6 Sportback e-tron", batteryKwh: 75.8, maxAC: 11 },
  {
    brand: "Audi",
    model: "A6 Sportback e-tron",
    variant: "Performance",
    batteryKwh: 94.9,
    maxAC: 11,
  },
  { brand: "Audi", model: "e-tron GT quattro", batteryKwh: 83.7, maxAC: 11 },
  { brand: "Audi", model: "RS e-tron GT", batteryKwh: 83.7, maxAC: 11 },
  { brand: "Audi", model: "e-tron 50 quattro", batteryKwh: 71, maxAC: 11 },
  { brand: "Audi", model: "e-tron 55 quattro", batteryKwh: 95, maxAC: 11 },

  /* ===== BYD ===== */
  { brand: "BYD", model: "Atto 2", variant: "Premium", batteryKwh: 45.12, maxAC: 7 },
  { brand: "BYD", model: "Atto 3", variant: "Advance", batteryKwh: 49.92, maxAC: 7 },
  { brand: "BYD", model: "Seal", variant: "Dynamic", batteryKwh: 61.44, maxAC: 7 },
  { brand: "BYD", model: "Seal", variant: "Premium", batteryKwh: 82.56, maxAC: 7 },
  { brand: "BYD", model: "Sealion 7", variant: "Premium", batteryKwh: 82.56, maxAC: 11 },
  { brand: "BYD", model: "Shark 6", variant: "Premium", batteryKwh: 29.58, maxAC: 7 },

  /* ===== GWM ===== */
  { brand: "GWM", model: "ORA 03", batteryKwh: 47.78, maxAC: 7 },
  { brand: "GWM", model: "ORA 05", batteryKwh: 58.33, maxAC: 7 },
  { brand: "GWM", model: "ORA 07", batteryKwh: 83.49, maxAC: 11 },
  { brand: "GWM", model: "Haval H6 PHEV", batteryKwh: 19.09, maxAC: 7 },
  { brand: "GWM", model: "Tank 500 PHEV", batteryKwh: 37.11, maxAC: 7 },

  /* ===== CHANGAN ===== */
  { brand: "Changan", model: "Deepal S07", batteryKwh: 66.8, maxAC: 7 },
  { brand: "Changan", model: "Deepal S05 REEV", batteryKwh: 27.28, maxAC: 7 },

  /* ===== OMODA & JAECOO ===== */
  { brand: "Omoda", model: "E5", batteryKwh: 61, maxAC: 11 },
  { brand: "Omoda", model: "7 PHEV", variant: "Premium", batteryKwh: 18.4, maxAC: 7 },
  { brand: "Jaecoo", model: "J5", variant: "Premium Plus", batteryKwh: 58.9, maxAC: 11 },
  { brand: "Jaecoo", model: "J6", variant: "Comfort RWD", batteryKwh: 49.9, maxAC: 7 },
  { brand: "Jaecoo", model: "J6", variant: "Luxury RWD", batteryKwh: 65.6, maxAC: 7 },
  { brand: "Jaecoo", model: "J6", variant: "Premium AWD", batteryKwh: 69.7, maxAC: 7 },
  { brand: "Jaecoo", model: "J7", variant: "Premium", batteryKwh: 18.3, maxAC: 7 },

  /* ===== GAC ===== */
  { brand: "GAC", model: "Aion UT", variant: "Elite", batteryKwh: 44.12, maxAC: 7 },
  { brand: "GAC", model: "Aion V", variant: "Premium", batteryKwh: 64.5, maxAC: 7 },
  { brand: "GAC", model: "Hyptec HT", batteryKwh: 83, maxAC: 7 },

  /* ===== CHERY ===== */
  { brand: "Chery", model: "Tiggo 7 PHEV", batteryKwh: 18.3, maxAC: 7 },
  { brand: "Chery", model: "Tiggo 8 PHEV", batteryKwh: 18.3, maxAC: 7 },
  { brand: "Chery", model: "Tiggo 9 PHEV", batteryKwh: 34.46, maxAC: 7 },
  { brand: "Chery", model: "Q Premium", batteryKwh: 42.7, maxAC: 7 },

  /* ===== PORSCHE =====
     The two Taycans are different cars to charge: the
     European car takes 22 kW on Type 2, the Japanese import
     takes 7 kW on Type 1. Getting this wrong means selling
     someone a cable that doesn't fit their car. */
  {
    brand: "Porsche",
    model: "Taycan",
    variant: "European spec",
    batteryKwh: 89,
    maxAC: 22,
    connector: "Type 2",
  },
  {
    brand: "Porsche",
    model: "Taycan",
    variant: "Japanese import",
    batteryKwh: 89,
    maxAC: 7,
    connector: "Type 1",
  },

  /* ===== RANGE ROVER ===== */
  { brand: "Range Rover", model: "P400e", batteryKwh: 13.1, maxAC: 7 },

  /* ===== DONGFENG ===== */
  { brand: "Dongfeng", model: "GUGO Box E1 Eco", batteryKwh: 31.4, maxAC: 7 },
  { brand: "Dongfeng", model: "GUGO Box E2 Plus", batteryKwh: 42.3, maxAC: 7 },
  { brand: "Dongfeng", model: "GUGO Box E3 Premium", batteryKwh: 42.3, maxAC: 7 },

  /* ===== MG ===== */
  { brand: "MG", model: "HS Super Hybrid PHEV", batteryKwh: 24.7, maxAC: 7 },
];

/* ---------------------------------------------------------
    TODO — in the old list but absent from Multiline's market
    document: KIA EV5, KIA Sorento, BMW iX. Confirm whether
    they're still sold before dropping them for good.
--------------------------------------------------------- */

export const EV_BRANDS = [
  ...new Set(EV_VEHICLES.map((vehicle) => vehicle.brand)),
].sort();

export const modelsForBrand = (brand: string) =>
  EV_VEHICLES.filter((vehicle) => vehicle.brand === brand);

/** Label for dropdowns — variant shown only where it matters. */
export const vehicleLabel = (vehicle: EVVehicle) =>
  vehicle.variant ? `${vehicle.model} (${vehicle.variant})` : vehicle.model;