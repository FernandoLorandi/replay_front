import { Project } from '@/data/fixtures/projects';

export type ProjectCardProps = {
  project: Project;
  isHovered: boolean;
  variant?: 'grid' | 'reels';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type ProjectReelsTrackProps = {
  projects: Project[];
  hoveredProjectSlug: string | null;
  onHoverProject: (slug: string | null) => void;
};
