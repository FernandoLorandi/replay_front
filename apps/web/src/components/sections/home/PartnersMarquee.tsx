'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PartnerLogo } from '@/types/cms';

type PartnersMarqueeProps = {
  partners: PartnerLogo[];
};

export default function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const duplicatedPartners = [...partners, ...partners, ...partners];

  useGSAP(() => {
    if (!trackRef.current || partners.length === 0) return;

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 24,
      ease: 'none',
      repeat: -1,
    });

    return () => tween.kill();
  }, [partners.length]);

  return (
    <div className="relative min-w-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-zinc-950 to-transparent opacity-100" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-zinc-950 to-transparent opacity-100" />
      <div ref={trackRef} className="items center flex w-max gap-10">
        {duplicatedPartners.map((partner, index) => (
          <div key={`${partner.name}-${index}`} className="flex min-w-36">
            <Image
              src={partner.logoSrc}
              alt={partner.logoAlt}
              width={144}
              height={144}
              style={{ objectFit: 'contain', width: 'auto' }}
              className="opacity-50 grayscale"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
