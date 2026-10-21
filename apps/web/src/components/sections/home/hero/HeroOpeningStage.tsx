'use client';

import type { NavItem } from '@/types/navigation';
import type { ProjectSummary } from '@/types/cms';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import SiteNav from '@/components/layout/SiteNav';
import { Play } from 'lucide-react';
import {
  getHeroProjectIndex,
  getNextHeroProjectIndex,
  shouldAnimateHeroTransition,
} from './hero-projects';
import { HOME_INTRO_SESSION_KEY, shouldPlayHomeIntro } from './home-intro';
import LogoImg from '@/components/ui/LogoImg';

gsap.registerPlugin(ScrollTrigger);

type HeroOpeningStageProps = {
  navigationItems: NavItem[];
  projects: ProjectSummary[];
};

export default function HeroOpeningStage({
  navigationItems,
  projects,
}: HeroOpeningStageProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaFrameRef = useRef<HTMLDivElement | null>(null);
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const introOverlayRef = useRef<HTMLDivElement | null>(null);
  const introCounterRef = useRef<HTMLSpanElement | null>(null);
  const mediaLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const shutterBladeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasFinishedOpeningRef = useRef(false);
  const previousActiveIndexRef = useRef<number | null>(null);
  const shutterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasFinishedOpening, setHasFinishedOpening] = useState(false);
  const [introMode, setIntroMode] = useState<'pending' | 'play' | 'skip'>(
    'pending'
  );
  const activeProject = projects[activeIndex] ?? null;
  const hasMultipleProjects = projects.length > 1;

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    if (!hasFinishedOpeningRef.current || !hasMultipleProjects) return;

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const touchStart = touchStartRef.current;
    touchStartRef.current = null;

    if (
      !touchStart ||
      !hasFinishedOpeningRef.current ||
      !hasMultipleProjects ||
      window.matchMedia('(min-width: 768px)').matches
    ) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = touchStart.y - touch.clientY;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    setActiveIndex((currentIndex) =>
      getNextHeroProjectIndex(currentIndex, deltaX > 0 ? 1 : -1, projects.length)
    );
  }

  useEffect(() => {
    setIntroMode(
      shouldPlayHomeIntro(sessionStorage.getItem(HOME_INTRO_SESSION_KEY))
        ? 'play'
        : 'skip'
    );
  }, []);

  useEffect(() => {
    mediaVideoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        void video.play().catch(() => undefined);
        return;
      }

      video.pause();
    });
  }, [activeIndex]);

  useGSAP(
    () => {
      if (!mediaFrameRef.current || !navBarRef.current || !textRef.current)
        return;

      const tl = gsap.timeline();
      const interfaceElements = [
        navBarRef.current,
        textRef.current,
        dotsRef.current,
      ].filter((element): element is HTMLDivElement => element !== null);

      if (introMode === 'pending') return;

      if (introMode === 'skip') {
        gsap.set(mediaFrameRef.current, {
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          yPercent: 0,
          borderRadius: '2rem',
        });
        gsap.set(interfaceElements, { autoAlpha: 1, y: 0 });
        hasFinishedOpeningRef.current = true;
        setHasFinishedOpening(true);
        return;
      }

      gsap.set(mediaFrameRef.current, {
        width: '100%',
        height: 200,
        top: '50%',
        left: 0,
        yPercent: -50,
        borderRadius: 32,
      });

      gsap.set(interfaceElements, {
        autoAlpha: 0,
        y: 24,
      });

      gsap.set(introOverlayRef.current, { autoAlpha: 1 });

      const counter = { value: 0 };

      tl.to(counter, {
        value: 100,
        duration: 2.2,
        ease: 'power2.out',
        snap: { value: 1 },
        onUpdate: () => {
          if (introCounterRef.current) {
            introCounterRef.current.textContent = `${String(Math.round(counter.value)).padStart(3, '0')}%`;
          }
        },
      })
        .to(introOverlayRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(mediaFrameRef.current, {
          height: '100%',
          top: 0,
          yPercent: 0,
          borderRadius: '2rem',
          duration: 1.2,
          ease: 'power3.out',
        })
        .to(
          interfaceElements,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '>'
        )
        .call(() => {
          hasFinishedOpeningRef.current = true;
          setHasFinishedOpening(true);
          sessionStorage.setItem(HOME_INTRO_SESSION_KEY, 'seen');
        });
    },
    { dependencies: [introMode], scope: sectionRef }
  );

  useGSAP(
    () => {
      const mediaLayers = mediaLayerRefs.current.filter(
        (layer): layer is HTMLDivElement => layer !== null
      );
      const shutterBlades = shutterBladeRefs.current.filter(
        (blade): blade is HTMLDivElement => blade !== null
      );

      if (!hasFinishedOpening || mediaLayers.length === 0) return;

      const shouldAnimateShutter = shouldAnimateHeroTransition(
        previousActiveIndexRef.current,
        activeIndex
      );
      previousActiveIndexRef.current = activeIndex;

      gsap.to(mediaLayers, {
        autoAlpha: 0,
        scale: 1.04,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(mediaLayers[activeIndex], {
        autoAlpha: 1,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        overwrite: true,
      });

      if (shouldAnimateShutter && shutterBlades.length === 2) {
        shutterTimelineRef.current?.kill();
        shutterTimelineRef.current = gsap
          .timeline()
          .set(shutterBlades, { scaleY: 0 })
          .to(shutterBlades, {
            scaleY: 1,
            duration: 0.22,
            ease: 'power2.in',
          })
          .to(shutterBlades, {
            scaleY: 0,
            duration: 0.42,
            ease: 'power3.out',
          });
      }

      if (textRef.current && activeIndex !== 0) {
        gsap.fromTo(
          textRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            overwrite: true,
          }
        );
      }
    },
    { dependencies: [activeIndex, hasFinishedOpening], scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !hasMultipleProjects) return;

      const media = gsap.matchMedia();

      media.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          if (!mediaFrameRef.current) return;

          const interfaceElements = [
            navBarRef.current,
            textRef.current,
            dotsRef.current,
          ].filter((element): element is HTMLDivElement => element !== null);
          const moveMedia = gsap.quickTo(mediaFrameRef.current, 'y', {
            duration: 0.3,
            ease: 'power3.out',
          });
          const scaleMedia = gsap.quickTo(mediaFrameRef.current, 'scale', {
            duration: 0.3,
            ease: 'power3.out',
          });
          const moveInterface = gsap.quickTo(interfaceElements, 'y', {
            duration: 0.3,
            ease: 'power3.out',
          });
          const fadeInterface = gsap.quickTo(interfaceElements, 'opacity', {
            duration: 0.3,
            ease: 'power3.out',
          });

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (projects.length - 1)}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            onUpdate: (trigger) => {
              const nextIndex = getHeroProjectIndex(
                trigger.progress,
                projects.length
              );
              const exitProgress = Math.max(
                0,
                Math.min(1, (trigger.progress - 0.8) / 0.2)
              );
              if (hasFinishedOpeningRef.current) {
                moveMedia(-56 * exitProgress);
                scaleMedia(1 - 0.04 * exitProgress);
                moveInterface(-48 * exitProgress);
                fadeInterface(1 - 0.25 * exitProgress);
              }

              setActiveIndex((currentIndex) =>
                currentIndex === nextIndex ? currentIndex : nextIndex
              );
            },
          });
        }
      );

      return () => media.revert();
    },
    { dependencies: [hasMultipleProjects, projects.length], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-lvh w-lvw overflow-hidden">
      <div className="relative h-full w-full bg-zinc-950 p-4 lg:p-8">
        <div className="relative h-full w-full">
          {introMode === 'play' ? (
            <div
              ref={introOverlayRef}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-zinc-950 text-white"
            >
              <LogoImg />
              <span
                ref={introCounterRef}
                className="font-mono text-sm tracking-[0.4em]"
              >
                000%
              </span>
            </div>
          ) : null}
          <div
            ref={mediaFrameRef}
            className="absolute touch-pan-y overflow-hidden bg-zinc-900 lg:touch-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((project, index) => {
              const mediaSrc =
                project.homeHeroMediaSrc ??
                project.previewMediaSrc ??
                '/continentalImage.png';
              const mediaAlt =
                project.homeHeroMediaAlt ??
                project.previewMediaAlt ??
                'Video de apoio';
              const mediaType =
                project.homeHeroMediaType ??
                project.previewMediaType ??
                'image';

              return (
                <div
                  key={project.slug}
                  ref={(element) => {
                    mediaLayerRefs.current[index] = element;
                  }}
                  className={`absolute inset-0 ${index === 0 ? 'visible' : 'invisible'}`}
                >
                  {mediaType === 'video' ? (
                    <video
                      src={mediaSrc}
                      ref={(element) => {
                        mediaVideoRefs.current[index] = element;
                      }}
                      className="size-full object-cover"
                      aria-label={mediaAlt}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={mediaSrc}
                      alt={mediaAlt}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
            <div
              ref={(element) => {
                shutterBladeRefs.current[0] = element;
              }}
              className="pointer-events-none absolute inset-x-0 top-0 z-5 h-1/2 origin-top scale-y-0 bg-zinc-950"
              aria-hidden="true"
            />
            <div
              ref={(element) => {
                shutterBladeRefs.current[1] = element;
              }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-1/2 origin-bottom scale-y-0 bg-zinc-950"
              aria-hidden="true"
            />
            <div
              ref={navBarRef}
              className="absolute inset-x-0 top-0 z-10 px-5 md:px-12"
            >
              <SiteNav items={navigationItems} />
            </div>

            <div
              ref={textRef}
              className="absolute inset-x-0 bottom-10 z-10 px-5 lg:px-12"
            >
              <div className="flex min-w-0 items-end justify-between gap-6">
                <div className="min-w-0">
                  <span className="inline-block w-full text-left text-5xl font-bold tracking-tight text-white md:text-8xl">
                    {activeProject?.homeTitle ?? activeProject?.title ?? ''}
                  </span>
                  <span className="inline-block w-full text-base leading-6 font-medium text-zinc-400">
                    {activeProject?.homeSummary ??
                      activeProject?.category ??
                      'Tipo do projeto'}
                  </span>
                </div>

                <div className="hidden h-fit w-fit rounded-lg border border-transparent bg-zinc-800/10 px-4 py-4 backdrop-blur-lg transition hover:border-zinc-400 lg:flex">
                  <Play className="text-zinc-50" fill="white" size={32} />
                </div>
              </div>
            </div>

            {hasMultipleProjects ? (
              <div
                ref={dotsRef}
                className="absolute top-1/2 right-8 z-10 flex -translate-y-1/2 flex-col gap-3 md:right-12"
                aria-label={`Projeto ${activeIndex + 1} de ${projects.length}`}
              >
                {projects.map((project, index) => (
                  <span
                    key={project.slug}
                    className={`size-2 rounded-full transition-colors duration-300 ${
                      index === activeIndex ? 'bg-white' : 'bg-white/35'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
