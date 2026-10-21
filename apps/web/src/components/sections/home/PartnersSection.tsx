import Image from 'next/image';
import type { PartnerLogo } from '@/types/cms';
import PartnersMarquee from './PartnersMarquee';

type PartnerSectionProps = {
  partners: PartnerLogo[];
};

export default function PartnerSection({ partners }: PartnerSectionProps) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-4 border-y border-y-zinc-800 bg-zinc-900 px-6 py-6 lg:flex-row lg:items-center lg:gap-14 lg:px-20">
      <div className="w-full max-w-96">
        <h1 className="text-xl leading-7 font-medium tracking-normal text-wrap text-zinc-400">
          Reconhecida por grandes marcas.
        </h1>
      </div>
      <div className="w-full min-w-0 overflow-hidden lg:flex-1">
        <PartnersMarquee partners={partners} />
      </div>
    </div>
  );
}
