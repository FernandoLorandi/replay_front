import Image from 'next/image';
import type { PartnerLogo } from '@/types/cms';
import PartnersMarquee from './PartnersMarquee';

type PartnerSectionProps = {
  partners: PartnerLogo[];
};

export default function PartnerSection({ partners }: PartnerSectionProps) {
  return (
    <div className="mx-20 flex items-center justify-between gap-14 border-y border-y-zinc-900 py-6">
      <div className="w-96">
        <h1 className="text-xl leading-7 font-medium tracking-normal text-wrap text-zinc-400">
          Confiável pelas marcas mais empolgantes do mundo.
        </h1>
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <PartnersMarquee partners={partners} />
      </div>
    </div>
  );
}
