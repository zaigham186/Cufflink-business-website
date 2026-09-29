import HeroNoir from "@/components/home/HeroNoir";
import CollectionIntro from "@/components/home/CollectionIntro";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCollectionsShowcase from "@/components/home/FeaturedCollectionsShowcase";
import BrandStory from "@/components/home/BrandStory";
import FinalCTA from "@/components/home/FinalCTA";
import BrandTicker from "@/components/home/BrandTicker";
import BrassLine from "@/components/ui/BrassLine";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <>
      {/* 01. Hero (Ken Burns cinematic images + GSAP entrance) */}
      <HeroNoir />

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
