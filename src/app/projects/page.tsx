import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected Multiline engineering projects across Pakistan.",
};

export default function ProjectsPage() {
  return (
    <ComingSoonPage
      eyebrow="Projects"
      title="Built for sites that can’t afford downtime."
      description="A curated project archive is on the way. Contact us to discuss deployments similar to yours."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects" },
      ]}
    />
  );
}
