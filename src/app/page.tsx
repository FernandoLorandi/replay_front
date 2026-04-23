import ContactSection from '@/components/sections/home/ContactSection';
import Hero from '@/components/sections/home/HeroSection';
import PartnerSection from '@/components/sections/home/PartnersSection';
import ProjectSection from '@/components/sections/home/ProjectSection';

export default function Home() {
  return (
    <div className="flex w-screen flex-col gap-40 bg-zinc-950">
      <Hero></Hero>
      <PartnerSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
}
