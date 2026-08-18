// import { ClientsCarousel } from "@/components/home/ClientsCarousel";
// import { CorporateIdentity } from "@/components/home/CorporateIdentity";
// import { HomeHero } from "@/components/home/HomeHero";
// import { OurStoryCollage } from "@/components/home/OurStoryCollage";
// import { PartnersGrid } from "@/components/home/PartnersGrid";
// import { ProductCards } from "@/components/home/ProductCards";
// import { StatsStrip } from "@/components/home/StatsStrip";
// import { TeamBanner } from "@/components/home/TeamBanner";

// export default function HomePage() {
//   return (
//     <main className="bg-paper text-ink">
//       <HomeHero />
//       <StatsStrip />
//       <ProductCards />
//       <CorporateIdentity />
//       <OurStoryCollage />
//       <PartnersGrid />
//       <TeamBanner />
//       <ClientsCarousel />
//     </main>
//   );
// }
import { Home2ExploreSolutions } from "@/components/home2/Home2ExploreSolutions";
import { Home2Heritage } from "@/components/home2/Home2Heritage";
import { Home2Hero } from "@/components/home2/Home2Hero";
import { Home2PowerSolutions } from "@/components/home2/Home2PowerSolutions";
import { Home2StatsMarquee } from "@/components/home2/Home2StatsMarquee";
import { Home2StoryStatement } from "@/components/home2/Home2StoryStatement";

export default function HomePageTwo() {
  return (
    <main className="font-host bg-paper text-ink">
      <Home2Hero />
      <Home2StatsMarquee />
      <Home2PowerSolutions />
      <Home2StoryStatement />
      <Home2Heritage />

      <Home2ExploreSolutions />
    </main>
  );
}