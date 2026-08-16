import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Company",
  description: "Multiline Engineering — power infrastructure since 1975.",
};

export default function CompanyPage() {
  return (
    <ComingSoonPage
      eyebrow="Company"
      title="Engineering power since 1975."
      description="Our company story and team pages are being rebuilt. For partnerships and procurement, contact the engineering desk."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Company" },
      ]}
    />
  );
}
