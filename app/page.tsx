import HeroNoir from "@/frontend/components/home/HeroNoir";
import CollectionIntro from "@/frontend/components/home/CollectionIntro";
import CategoryGrid from "@/frontend/components/home/CategoryGrid";
import FeaturedCollectionsShowcase from "@/frontend/components/home/FeaturedCollectionsShowcase";
import BrandStory from "@/frontend/components/home/BrandStory";
import FinalCTA from "@/frontend/components/home/FinalCTA";
import BrandTicker from "@/frontend/components/home/BrandTicker";
import BrassLine from "@/frontend/components/ui/BrassLine";
import { getAllProducts } from "@/shared/lib/products";
import { connectToDatabase } from "@/backend/lib/db";
import SiteContentModel from "@/backend/models/SiteContent";

export const revalidate = 60;

export default async function Home() {
  await connectToDatabase();
  const [products, siteContent] = await Promise.all([
    getAllProducts(),
    SiteContentModel.findOne().lean(),
  ]);

  return (
    <>
      {/* 01. Hero (Ken Burns cinematic images + GSAP entrance) */}
      <HeroNoir
        headline={siteContent?.heroHeadline}
        subtext={siteContent?.heroSubtext}
      />

      {/* Ticker strip — champagne brass infinite scroll */}
      <BrandTicker />

      <BrassLine />

      {/* 02. Collection Introduction (stats + brass line draw) */}
      <CollectionIntro />
      <BrassLine />

      {/* 03. Shop by Collection (clip-path card reveals + image scale) */}
      <CategoryGrid />
      <BrassLine />

      {/* 04. Curated Collections Showcase with Professional Product Cards */}
      <FeaturedCollectionsShowcase products={products} />
      <BrassLine />

      {/* 05. Editorial Brand Story (parallax bg + pull quote reveal) */}
      <BrandStory />
      <BrassLine />

      {/* 06. Final CTA (ambient glow + rule draw + buttons back.out) */}
      <FinalCTA />
    </>
  );
}
