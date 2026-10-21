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

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-0 -mb-[100svh] hidden h-svh overflow-hidden lg:block"
        >
          <div className="absolute inset-y-0 right-0 w-[min(55vw,900px)] bg-zinc-950 bg-[url('/backgroundImage.png')] bg-contain bg-right bg-no-repeat opacity-10 bg-blend-screen" />
        </div>

        <div className="relative z-10 flex flex-col gap-20">
          <PartnerSection partners={homePageData.partners} />

          <ProjectSection
            projectCategories={homePageData.projectCategories}
            projects={homePageData.projects}
          />

          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
