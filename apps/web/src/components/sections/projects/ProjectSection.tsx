'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectTab from './ProjectTab';
import ProjectCard from './ProjectCard';
import ProjectReelsTrack from './ProjectReelsTrack';
import ProjectVideoModal from './ProjectVideoModal';
import Button from '@/components/ui/Button';
import type { ProjectCategory, ProjectSummary } from '@/types/cms';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);
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

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !filtersRef.current) {
      return;
    }

    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-project-card]',
        sectionRef.current,
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      timeline
        .fromTo(
          headingRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        )
        .fromTo(
          filtersRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          '-=0.3',
        )
        .fromTo(
          cards,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.2',
        );
    });

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="mx-20 my-20">
      <div ref={headingRef} className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold tracking-tight text-white">
          Projetos Selecionados
        </h1>
        <span className="font-base leading-6 text-zinc-400">
          Do roteiro a finalizacao: resultados reais entregues com excelencia
          tecnica e criatividade
        </span>
      </div>

      <div ref={filtersRef} className="my-8 flex flex-wrap gap-4">
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
