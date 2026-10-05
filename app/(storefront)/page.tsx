import HeroNoir from "@/components/storefront/home/HeroNoir";
import CollectionIntro from "@/components/storefront/home/CollectionIntro";
import CategoryGrid from "@/components/storefront/home/CategoryGrid";
import FeaturedCollectionsShowcase from "@/components/storefront/home/FeaturedCollectionsShowcase";
import BrandStory from "@/components/storefront/home/BrandStory";
import FinalCTA from "@/components/storefront/home/FinalCTA";
import BrandTicker from "@/components/storefront/home/BrandTicker";
import BrassLine from "@/components/ui/BrassLine";
import { productService } from "@/lib/server/services/product.service";
import { contentService } from "@/lib/server/services/content.service";

export const revalidate = 60;

export default async function Home() {
  const [products, siteContent] = await Promise.all([
    productService.getAllProducts(),
    contentService.getSiteContent(),
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
