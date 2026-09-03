import HeroNoir from "@/components/home/HeroNoir";
import BrassLine from "@/components/ui/BrassLine";
import CollectionIntro from "@/components/home/CollectionIntro";
import FeaturedProductStory from "@/components/home/FeaturedProductStory";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroNoir />
      <BrassLine className="max-w-container mx-auto" />
      <CollectionIntro />
      <BrassLine className="max-w-container mx-auto" />
      <FeaturedProductStory />
      <BrassLine className="max-w-container mx-auto" />
      <FeaturedProducts />
      <BrassLine className="max-w-container mx-auto" />
      <BrandStory />
      <BrassLine className="max-w-container mx-auto" />
      <FinalCTA />
    </>
  );
}
