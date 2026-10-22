import SiteNav from '@/components/layout/SiteNav';
import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import ProjectSection from '@/components/sections/projects/ProjectSection';
import { getHomePageData } from '@/lib/strapi/repository';

export default async function ProjetosPage() {
  const homePageData = await getHomePageData();

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -mb-[100svh] block h-svh overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 h-[min(70vw,900px)] w-[min(70vw,900px)] -translate-x-1/2 -rotate-90 bg-zinc-950 bg-[url('/backgroundImage.png')] bg-contain bg-center bg-no-repeat opacity-10 bg-blend-screen" />
      </div>
      <div className="relative z-10 flex w-full flex-col">
        <div className="px-4 sm:px-8 lg:px-20">
          <SiteNav items={homePageData.navigationItems} />
        </div>

        <ProjectSection
          projectCategories={homePageData.projectCategories}
          projects={homePageData.projects}
          showCta={false}
        />

        <div className="mt-20 flex flex-col lg:mt-36">
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
