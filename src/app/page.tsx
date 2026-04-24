import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import Hero from '@/components/sections/home/HeroSection';
import PartnerSection from '@/components/sections/home/PartnersSection';
import ProjectSection from '@/components/sections/projects/ProjectSection';

export default function Home() {
  return (
    <div className="flex w-screen flex-col gap-20">
      <Hero></Hero>
      <PartnerSection />
      <ProjectSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
