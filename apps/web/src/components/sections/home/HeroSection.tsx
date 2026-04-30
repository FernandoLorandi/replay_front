import Image from 'next/image';
import Navbar from '../../layout/SiteNav';
import { Play } from 'lucide-react';
import type { NavItem } from '@/types/navigation';
import type { ProjectSummary } from '@/types/cms';

type HeroSectionProps = {
  featuredProject: ProjectSummary | null;
  featuredProjects?: ProjectSummary[];
  navigationItems: NavItem[];
};

export default function HeroSection({
  featuredProject,
  featuredProjects = [],
  navigationItems,
}: HeroSectionProps) {
  const heroProject = featuredProjects[0] ?? featuredProject;
  const heroMediaSrc =
    heroProject?.homeHeroMediaSrc ??
    heroProject?.previewMediaSrc ??
    '/continentalImage.png';
  const heroMediaAlt =
    heroProject?.homeHeroMediaAlt ??
    heroProject?.previewMediaAlt ??
    'Video de apoio';
  const heroMediaType =
    heroProject?.homeHeroMediaType ?? heroProject?.previewMediaType ?? 'image';
  const heroTitle =
    heroProject?.homeTitle ?? heroProject?.title ?? 'Continental';
  const heroLabel =
    heroProject?.homeSummary ?? heroProject?.category ?? 'Tipo do projeto';

  return (
    <div className="relative h-lvh w-lvw">
      <div className="absolute inset-x-0 top-8 z-10 px-20">
        <Navbar items={navigationItems} />
      </div>

      <div className="relative h-full w-full bg-zinc-950 p-8">
        <div className="relative h-full w-full overflow-hidden rounded-4xl bg-zinc-900">
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
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="absolute inset-x-0 bottom-20 z-10 px-20">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block w-full text-left text-8xl font-bold tracking-tight text-white">
              {heroTitle}
            </span>
            <span className="inline-block w-full text-base leading-6 font-medium text-zinc-400">
              {heroLabel}
            </span>
          </div>
          <div className="transition- h-fit w-fit rounded-lg border-transparent bg-zinc-800/10 px-4 py-4 backdrop-blur-lg backdrop-opacity-7 transition hover:border hover:border-zinc-400">
            <Play className="text-zinc-50" fill="white" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
