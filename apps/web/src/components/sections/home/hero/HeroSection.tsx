import HeroOpeningStage from './HeroOpeningStage';
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
    <HeroOpeningStage
      navigationItems={navigationItems}
      heroMediaSrc={heroMediaSrc}
      heroMediaAlt={heroMediaAlt}
      heroMediaType={heroMediaType}
      heroTitle={heroTitle}
      heroLabel={heroLabel}
    />
  );
}
