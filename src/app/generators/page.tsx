import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Generators",
  description: "Power generation and backup solutions by Multiline Engineering.",
};

export default function GeneratorsPage() {
  return (
    <ComingSoonPage
      eyebrow="Generators"
      title="Reliable power when the grid isn’t."
      description="Generator and hybrid power pages are coming next. Reach out for commercial and industrial requirements today."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Generators" },
      ]}
    />
  );
}
