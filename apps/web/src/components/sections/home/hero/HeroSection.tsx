import HeroOpeningStage from './HeroOpeningStage';
import { normalizeHeroProjects } from './hero-projects';
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
  const heroProjects = normalizeHeroProjects(featuredProjects, featuredProject);

  return (
    <HeroOpeningStage
      navigationItems={navigationItems}
      projects={heroProjects}
    />
  );
}
