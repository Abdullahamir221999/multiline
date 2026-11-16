export type ChargerVariant = {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;

  /** One line on who this one suits. */
  positioning: string;

  specs: { label: string; value: string }[];
  documents?: { label: string; file: string }[];
};

/* =========================================================
    22 kW — two units, one page

    Multiline stocks a Jensonn and a Smappee at 22 kW. They
    are not variants of the same product: different makers,
    different enclosure ratings, different feature sets, and
    a 55,000 price gap. The page shows both side by side and
    lets the visitor pick, rather than hiding one.

    Figures are from each maker's own datasheet.
========================================================= */

export const TWENTY_TWO_KW: ChargerVariant[] = [
  {
    id: "jensonn-22",
    brand: "Jensonn",
    name: "22kW AC Charging Pile",
    price: "From PKR 225,000",
    image: "/images/products/22kw-jensonn-ac4.png",
    positioning:
      "The everyday choice — IP65 sealed, with a 4.3-inch display and the full protection suite built in.",
    specs: [
      { label: "Rated output", value: "22 kW" },
      { label: "Operating voltage", value: "400 Vac ± 15%" },
      { label: "Rated current", value: "32 A" },
      { label: "Connector", value: "Type 2" },
      { label: "Enclosure rating", value: "IP65" },
      { label: "Interface", value: '4.3" display + RFID reader' },
      { label: "Communication", value: "Bluetooth / Wi-Fi" },
      { label: "Operating temperature", value: "-25°C to +50°C" },
      { label: "Over-voltage protection", value: "≥ 265V" },
      { label: "Under-voltage protection", value: "≤ 175V" },
      { label: "Dimensions", value: "360 × 195 × 90 mm" },
      { label: "Standards", value: "IEC 61851-1, IEC 62196-2" },
    ],
    documents: [
      {
        label: "Jensonn 22kW specification",
        file: "/docs/jensonn-22kw-specification.pdf",
      },
    ],
  },
  {
    id: "smappee-22",
    brand: "Smappee",
    name: "EV Wall",
    price: "From PKR 280,000",
    image: "/images/products/22kw-smappee-ev-wall.png",
    positioning:
      "The connected choice — MID-certified metering, dynamic load management and cloud session history.",
    specs: [
      { label: "Rated output", value: "22 kW" },
      { label: "Operating voltage", value: "230 V / 400 V" },
      { label: "Rated current", value: "32 A" },
      { label: "Connector", value: "Type 2 cable or socket" },
      { label: "Enclosure rating", value: "IP54 / IK10" },
      { label: "Interface", value: "RGB LED + RFID / QR" },
      { label: "Communication", value: "Ethernet 100BASE-T" },
      { label: "Protocol", value: "OCPP 1.6J" },
      { label: "Metering", value: "MID certified, class B" },
      { label: "Residual current", value: "6 mA DC RCM + 30 mA RCD type A" },
      { label: "Operating temperature", value: "-25°C to +40°C" },
      { label: "Dimensions", value: "300 × 300 × 110 mm" },
      { label: "Standards", value: "IEC 61851-1, AS/NZS 3820" },
    ],
    documents: [
      {
        label: "Smappee EV Wall specification",
        file: "/docs/smappee-ev-wall-specification.pdf",
      },
    ],
  },
];

/* ---------------------------------------------------------
    HONEST COMPARISON

    Worth saying out loud on the page rather than letting
    the visitor work it out: the Jensonn is better sealed
    and cheaper; the Smappee is better connected and
    certified for billing. Neither is simply "better".
--------------------------------------------------------- */

export const TWENTY_TWO_KW_NOTE =
  "Both deliver 22 kW on a three-phase supply. The Jensonn is sealed to IP65 and costs less; the Smappee has certified metering and load management, which matter if you bill for charging. We'll talk through which fits your site.";