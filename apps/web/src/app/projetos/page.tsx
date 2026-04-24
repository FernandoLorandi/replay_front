import SiteNav from '@/components/layout/SiteNav';
import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import ProjectSection from '@/components/sections/projects/ProjectSection';
import { getHomePageData } from '@/lib/strapi/repository';

export default async function ProjetosPage() {
  const homePageData = await getHomePageData();

  return (
    <div className="flex w-screen flex-col gap-48">
      <div className="px-20">
        <SiteNav items={homePageData.navigationItems} />
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-semibold tracking-tight text-white">
            Projetos Selecionados
          </h1>
          <span className="font-base leading-6 text-zinc-400">
            Trabalhos organizados para uma migracao incremental do conteudo para
            o CMS sem alterar a linguagem visual atual.
          </span>
        </div>
      </div>

      <ProjectSection
        projectCategories={homePageData.projectCategories}
        projects={homePageData.projects}
        showCta={false}
      />

      <div className="flex flex-col">
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
}
