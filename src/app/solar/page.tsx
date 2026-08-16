import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Solar",
  description:
    "Residential and commercial solar systems engineered by Multiline.",
};

export default function SolarPage() {
  return (
    <ComingSoonPage
      eyebrow="Solar"
      title="Solar systems, sized for your property."
      description="This section is being refined. In the meantime, our engineering team can assess your consumption, roof space and backup needs."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Solar" },
      ]}
    />
  );
}
