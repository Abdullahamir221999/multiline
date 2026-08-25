import { EVCompatibilityFinder } from "@/components/ev-charging/EVCompatibilityFinder";
import { EVDirectEnquiry } from "@/components/ev-charging/EVDirectEnquiry";
import { EVProductCatalogue } from "@/components/ev-charging/EVProductCatalogue";

export const EVSolutions = () => {
  return (
    <>
      <EVCompatibilityFinder />
      <EVProductCatalogue />
      <EVDirectEnquiry />
    </>
  );
};