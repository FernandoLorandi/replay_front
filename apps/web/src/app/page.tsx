import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import HeroSection from '@/components/sections/home/hero/HeroSection';
import PartnerSection from '@/components/sections/home/PartnersSection';
import ProjectSection from '@/components/sections/projects/ProjectSection';
import { getHomePageData } from '@/lib/strapi/repository';

export default async function Home() {
  const homePageData = await getHomePageData();

  return (
    <div className="flex w-screen flex-col gap-20">
      <HeroSection
        featuredProject={homePageData.featuredProject}
        featuredProjects={homePageData.featuredProjects}
        navigationItems={homePageData.navigationItems}
      />

      <PartnerSection partners={homePageData.partners} />

      <ProjectSection
        projectCategories={homePageData.projectCategories}
        projects={homePageData.projects}
      />

      <ContactSection />
      <FooterSection />
    </div>
  );
}
