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
    <div className="relative w-full min-w-0 overflow-hidden bg-zinc-900 py-2 sm:py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-zinc-900 to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-zinc-900 to-transparent sm:w-16" />
      <div ref={trackRef} className="flex w-max items-center gap-6 sm:gap-10">
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex min-w-24 sm:min-w-36"
          >
            <Image
              src={partner.logoSrc}
              alt={partner.logoAlt}
              width={144}
              height={144}
              style={{ objectFit: 'contain', width: 'auto' }}
              className="h-16 w-auto opacity-50 grayscale sm:h-24 lg:h-36"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
