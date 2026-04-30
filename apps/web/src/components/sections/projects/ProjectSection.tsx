'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProjectTab from './ProjectTab';
import ProjectCard from './ProjectCard';
import ProjectReelsTrack from './ProjectReelsTrack';
import ProjectVideoModal from './ProjectVideoModal';
import Button from '@/components/ui/Button';
import type { ProjectCategory, ProjectSummary } from '@/types/cms';

type ProjectSectionProps = {
  projectCategories: readonly ProjectCategory[];
  projects: ProjectSummary[];
  showCta?: boolean;
};

export default function ProjectSection({
  projectCategories,
  projects,
  showCta = true,
}: ProjectSectionProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>('Institucionais');
  const [selectedProject, setSelectedProject] = useState<ProjectSummary | null>(
    null
  );

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory
  );

  const hasFilteredProjects = filteredProjects.length > 0;
  const isReelsCategory = activeCategory === 'Reels';

  const [isHoveredProject, setIsHoveredProject] = useState<string | null>(null);

  return (
    <section className="mx-20 my-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold tracking-tight text-white">
          Projetos Selecionados
        </h1>
        <span className="font-base leading-6 text-zinc-400">
          Do roteiro a finalizacao: resultados reais entregues com excelencia
          tecnica e criatividade
        </span>
      </div>

      <div className="my-8 flex flex-wrap gap-4">
        {projectCategories.map((category) => (
          <ProjectTab
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {hasFilteredProjects ? (
        <div className="space-y-10">
          {isReelsCategory ? (
            <ProjectReelsTrack
              projects={filteredProjects}
              hoveredProjectSlug={isHoveredProject}
              onHoverProject={setIsHoveredProject}
              onSelectProject={setSelectedProject}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((project) => {
                const isHovered = isHoveredProject === project.slug;

                return (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    isHovered={isHovered}
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setIsHoveredProject(project.slug)}
                    onMouseLeave={() => setIsHoveredProject(null)}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-4xl border border-zinc-900 bg-zinc-950 px-8 py-16 text-center">
          <p className="text-xl font-medium tracking-tight text-white">
            Nenhum projeto encontrado para esta categoria.
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Tente selecionar outra aba ou adicione novos projetos para exibi-los
            aqui.
          </p>
        </div>
      )}

      {showCta ? (
        <div className="mt-20 flex justify-center">
          <Button
            label="Ver mais"
            onClick={() => router.push('/projetos')}
          ></Button>
        </div>
      ) : null}

      <ProjectVideoModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
