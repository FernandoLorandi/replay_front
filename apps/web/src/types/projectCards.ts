import type { ProjectSummary } from '@/types/cms';

export type ProjectCardProps = {
  project: ProjectSummary;
  isHovered: boolean;
  variant?: 'grid' | 'reels';
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type ProjectReelsTrackProps = {
  projects: ProjectSummary[];
  hoveredProjectSlug: string | null;
  onHoverProject: (slug: string | null) => void;
  onSelectProject: (project: ProjectSummary) => void;
};
