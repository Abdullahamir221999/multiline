import { EVHero } from "@/components/ev-charging-2/EVHero";
import { EVInstallSteps } from "@/components/ev-charging-2/EVinstallsteps";
import { EVVideo } from "@/components/ev-charging-2/Evvideo";
import { EVVehicleCoverage } from "@/components/ev-charging-2/EVVehicleCoverage";
import { EVChargerFinder } from "@/components/ev-charging-2/Evchargerfinder";
import { EVProductRange } from "@/components/ev-charging-2/EVProductRange";
import { EVQuoteBanner, EVQuoteForm } from "@/components/ev-charging-2/EVQuote";

export default function EVChargingPage() {
  return (
    <main className="bg-canvas">
      <EVHero />
      <EVInstallSteps />

      <EVVideo src="/videos/ev-charging-overview.mp4" />
      <EVQuoteBanner />
      <EVVehicleCoverage />
      <EVChargerFinder />
      <EVProductRange />
      <EVQuoteForm />
    </main>
  );
}