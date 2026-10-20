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
        className="pointer-events-none sticky top-0 -mb-[100svh] hidden h-svh overflow-hidden lg:block"
      >
        <div className="absolute top-0 left-1/2 h-[min(70vw,900px)] w-[min(70vw,900px)] -translate-x-1/2 -rotate-90 bg-zinc-950 bg-[url('/backgroundImage.png')] bg-contain bg-center bg-no-repeat opacity-50 bg-blend-multiply" />
      </div>
      <div className="relative z-10 flex w-screen flex-col">
        <div className="px-20">
          <SiteNav items={homePageData.navigationItems} />
        </div>

        <ProjectSection
          projectCategories={homePageData.projectCategories}
          projects={homePageData.projects}
          showCta={false}
        />

        <div className="mt-36 flex flex-col">
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
