import SiteNav from '@/components/layout/SiteNav';
import CardMember from '@/components/sections/equipe/CardMember';
import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import { getTeamPageData } from '@/lib/strapi/repository';

export default async function EquipePage() {
  const teamPageData = await getTeamPageData();

  return (
    <div>
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -mb-[100svh] hidden h-svh overflow-hidden lg:block"
      >
        <div className="absolute top-0 left-1/2 h-[min(70vw,900px)] w-[min(70vw,900px)] -translate-x-1/2 -rotate-90 bg-zinc-950 bg-[url('/backgroundImage.png')] bg-contain bg-center bg-no-repeat opacity-50 bg-blend-multiply" />
      </div>
      <div className="relative z-10 flex w-screen flex-col gap-48">
        <div className="px-20">
          <SiteNav items={teamPageData.navigationItems} />

          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-semibold tracking-tight text-white">
                Conheça a equipe por trás disso
              </h1>
              <span className="font-base leading-6 text-zinc-400">
                Do roteiro a finalizacao: resultados reais entregues com
                excelencia tecnica e criatividade
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
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
