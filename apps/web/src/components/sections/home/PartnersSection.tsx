import Image from 'next/image';
import type { PartnerLogo } from '@/types/cms';

type PartnerSectionProps = {
  partners: PartnerLogo[];
};

export default function PartnerSection({ partners }: PartnerSectionProps) {
  return (
    <div className="mx-20 flex items-center justify-between gap-14 border-y border-y-zinc-900 py-6">
      <div className="w-72">
        <h1 className="text-xl leading-7 font-medium tracking-normal text-wrap text-zinc-400">
          Confiável pelas marcas mais empolgantes do mundo.
        </h1>
      </div>
      <div className="flex gap-10">
        {partners.map((partner) => (
          <Image
            key={partner.name}
            src={partner.logoSrc}
            alt={partner.logoAlt}
            style={{ objectFit: 'contain', width: 'auto' }}
            width={150}
            height={150}
            className="opacity-50 grayscale"
          />
        ))}
      </div>
    </div>
  );
}
