'use client';

import type { NavItem } from '@/types/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import SiteNav from '@/components/layout/SiteNav';
import { Play } from 'lucide-react';

type HeroOpeningStageProps = {
  navigationItems: NavItem[];
  heroMediaSrc: string;
  heroMediaAlt: string;
  heroMediaType: 'image' | 'video';
  heroTitle: string;
  heroLabel: string;
};

export default function HeroOpeningStage({
  navigationItems,
  heroMediaAlt,
  heroMediaSrc,
  heroMediaType,
  heroLabel,
  heroTitle,
}: HeroOpeningStageProps) {
  const mediaFrameRef = useRef<HTMLDivElement | null>(null);
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!mediaFrameRef.current || !navBarRef.current || !textRef.current)
      return;

    const tl = gsap.timeline();

    gsap.set(mediaFrameRef.current, {
      width: '100%',
      height: 200,
      top: '50%',
      left: 0,
      yPercent: -50,
      borderRadius: 32,
    });

    gsap.set([navBarRef.current, textRef.current], {
      autoAlpha: 0,
      y: 24,
    });

    tl.to({}, { duration: 1 })
      .to(mediaFrameRef.current, {
        height: '100%',
        top: 0,
        yPercent: 0,
        borderRadius: '2rem',
        duration: 1.2,
        ease: 'power3.out',
      })
      .to(
        navBarRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        '>-0.05'
      )
      .to(
        textRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        '>-0.05'
      );
  }, []);

  return (
    <section className="relative h-lvh w-lvw overflow-hidden">
      <div className="relative h-full w-full bg-zinc-950 p-8">
        <div className="relative h-full w-full">
          <div
            ref={mediaFrameRef}
            className="absolute overflow-hidden bg-zinc-900"
          >
            {heroMediaType === 'video' ? (
              <video
                src={heroMediaSrc}
                className="size-full object-cover"
                aria-label={heroMediaAlt}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={heroMediaSrc}
                alt={heroMediaAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
            <div
              ref={navBarRef}
              className="absolute inset-x-0 top-0 z-10 px-12 md:px-20"
            >
              <SiteNav items={navigationItems} />
            </div>

            <div
              ref={textRef}
              className="absolute inset-x-0 bottom-10 z-10 px-12 md:bottom-20 md:px-20"
            >
              <div className="flex min-w-0 items-end justify-between gap-6">
                <div className="min-w-0">
                  <span className="inline-block w-full text-left text-5xl font-bold tracking-tight text-white md:text-8xl">
                    {heroTitle}
                  </span>
                  <span className="inline-block w-full text-base leading-6 font-medium text-zinc-400">
                    {heroLabel}
                  </span>
                </div>

                <div className="h-fit w-fit rounded-lg border border-transparent bg-zinc-800/10 px-4 py-4 backdrop-blur-lg transition hover:border-zinc-400">
                  <Play className="text-zinc-50" fill="white" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
