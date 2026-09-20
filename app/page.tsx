import HeroNoir from "@/components/home/HeroNoir";
import CollectionIntro from "@/components/home/CollectionIntro";
import FeaturedProductStory from "@/components/home/FeaturedProductStory";
import ProcessDetails from "@/components/home/ProcessDetails";
import HorizontalCollection from "@/components/home/HorizontalCollection";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandStory from "@/components/home/BrandStory";
import FinalCTA from "@/components/home/FinalCTA";
import BrassLine from "@/components/ui/BrassLine";

export default function Home() {
  return (
    <>
      {/* 01. Hero */}
      <HeroNoir />
      <BrassLine />

      {/* 02. Collection Introduction */}
      <CollectionIntro />
      <BrassLine />

      {/* 03. Featured Product Story (Ivory Pavé Gold Cufflinks) */}
      <FeaturedProductStory />
      <BrassLine />

      {/* 04. Material Story / Process Details */}
      <ProcessDetails />
      <BrassLine />

      {/* 05. Horizontal Collection ("Choose your finish" Gold → Blue → Silver → Gunmetal) */}
      <HorizontalCollection />
      <BrassLine />

      {/* 06. Category Grid */}
      <CategoryGrid />
      <BrassLine />

      {/* 07. Editorial Brand Story (Deep Petrol background) */}
      <BrandStory />
      <BrassLine />

      {/* 08. Final CTA */}
      <FinalCTA />
    </>
  );
}
