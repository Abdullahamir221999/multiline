import { ClientsCarousel } from "@/components/home/ClientsCarousel";
import { CorporateIdentity } from "@/components/home/CorporateIdentity";
import { HomeHero } from "@/components/home/HomeHero";
import { OurStoryCollage } from "@/components/home/OurStoryCollage";
import { PartnersGrid } from "@/components/home/PartnersGrid";
import { ProductCards } from "@/components/home/ProductCards";
import { StatsStrip } from "@/components/home/StatsStrip";
import { TeamBanner } from "@/components/home/TeamBanner";

export default function HomePage() {
  return (
    <main className="bg-paper text-ink">
      <HomeHero />
      <StatsStrip />
      <ProductCards />
      <CorporateIdentity />
      <OurStoryCollage />
      <PartnersGrid />
      <TeamBanner />
      <ClientsCarousel />
    </main>
  );
}
