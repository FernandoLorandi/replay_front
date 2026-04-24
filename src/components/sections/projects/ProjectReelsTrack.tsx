'use client';

import ProjectCard from './ProjectCard';
import type { ProjectReelsTrackProps } from '@/types/projectCards';

export default function ProjectReelsTrack({
  projects,
  hoveredProjectSlug,
  onHoverProject,
}: ProjectReelsTrackProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="hide-scrollbar flex gap-6 overflow-x-auto pb-2 pr-6">
        {projects.map((project) => {
          const isHovered = hoveredProjectSlug === project.slug;

          return (
            <ProjectCard
              key={project.slug}
              project={project}
              isHovered={isHovered}
              variant="reels"
              onMouseEnter={() => onHoverProject(project.slug)}
              onMouseLeave={() => onHoverProject(null)}
            />
          );
        })}
      </div>
    </div>
  );
}
