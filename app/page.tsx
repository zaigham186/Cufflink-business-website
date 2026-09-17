import HeroNoir from "@/components/home/HeroNoir";
import ProcessDetails from "@/components/home/ProcessDetails";
import CategoryGrid from "@/components/home/CategoryGrid";
import MoreAboutCufflinks from "@/components/home/MoreAboutCufflinks";
import BrassLine from "@/components/ui/BrassLine";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroNoir />
      <BrassLine />

      {/* 2. Process / Details */}
      <ProcessDetails />
      <BrassLine />

      {/* 3. Shop by Category */}
      <CategoryGrid />
      <BrassLine />

      {/* 4. More About the Cufflinks */}
      <MoreAboutCufflinks />
    </>
  );
}
