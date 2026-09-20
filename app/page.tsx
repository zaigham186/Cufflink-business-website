import HeroNoir from "@/components/home/HeroNoir";
import CollectionIntro from "@/components/home/CollectionIntro";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCollectionsShowcase from "@/components/home/FeaturedCollectionsShowcase";
import BrandStory from "@/components/home/BrandStory";
import FinalCTA from "@/components/home/FinalCTA";
import BrassLine from "@/components/ui/BrassLine";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <>
      {/* 01. Hero (Refined decent headline & real Ken Burns images) */}
      <HeroNoir />
      <BrassLine />

      {/* 02. Collection Introduction */}
      <CollectionIntro />
      <BrassLine />

      {/* 03. Shop by Collection (Classical, Signature, Premium interactive tiles) */}
      <CategoryGrid />
      <BrassLine />

      {/* 04. Curated Collections Showcase with Professional Product Cards */}
      <FeaturedCollectionsShowcase products={products} />
      <BrassLine />

      {/* 05. Editorial Brand Story */}
      <BrandStory />
      <BrassLine />

      {/* 06. Final CTA */}
      <FinalCTA />
    </>
  );
}
