import { EVHero } from "@/components/ev-charging/EVHero";
import { EVShowcase } from "@/components/ev-charging/EVShowcase";
import { EVVehicleCoverage } from "@/components/ev-charging/EVVehicleCoverage";
import { EVSolutions } from "@/components/ev-charging/EVSolutions";

export default function EVChargingPage() {
  return (
    <main className="bg-paper text-ink">
      <EVHero />

      <EVShowcase />

      <EVVehicleCoverage />

      <EVSolutions />
    </main>
  );
}