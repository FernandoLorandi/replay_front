import SiteNav from '@/components/layout/SiteNav';
import CardMember from '@/components/sections/equipe/CardMember';
import ContactSection from '@/components/sections/home/ContactSection';
import FooterSection from '@/components/sections/home/FooterSection';
import { members } from '@/data/fixtures/members';

export default function EquipePage() {
  return (
    <div className="flex w-screen flex-col gap-48">
      <div className="px-20">
        <SiteNav></SiteNav>
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
            {members.map((member) => (
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
  );
}
