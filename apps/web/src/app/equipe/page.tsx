import SiteNav from '@/components/layout/SiteNav';
import CardMember from '@/components/sections/equipe/CardMember';
import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import { getTeamPageData } from '@/lib/strapi/repository';

export default async function EquipePage() {
  const teamPageData = await getTeamPageData();

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -mb-[100svh] block h-svh overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 h-[min(70vw,900px)] w-[min(70vw,900px)] -translate-x-1/2 -rotate-90 bg-zinc-950 bg-[url('/backgroundImage.png')] bg-contain bg-center bg-no-repeat opacity-10 bg-blend-screen" />
      </div>
      <div className="relative z-10 flex w-full flex-col gap-20 lg:gap-48">
        <div className="px-4 sm:px-8 lg:px-20">
          <SiteNav items={teamPageData.navigationItems} />

          <div className="flex flex-col gap-10 lg:gap-20">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Conheça a equipe por trás disso
              </h1>
              <span className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Do roteiro a finalizacao: resultados reais entregues com
                excelencia tecnica e criatividade
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {teamPageData.members.map((member) => (
                <CardMember
                  key={member.src}
                  src={member.src}
                  alt={member.alt}
                  memberName={member.memberName}
                  position={member.position}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
