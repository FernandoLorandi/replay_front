'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import ProjectTab from '../projects/ProjectTab';
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from '@/data/fixtures/projects';
import Button from '@/components/ui/Button';

export default function ProjectSection() {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>('Todos');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const hasFilteredProjects = filteredProjects.length > 0;

  const [isHoveredProject, setIsHoveredProject] = useState<string | null>(null);

  return (
    <section className="mx-20">
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
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => {
            const isHovered = isHoveredProject === project.slug;

            return (
              <article
                key={project.slug}
                className="overflow-hidden rounded-4xl border border-zinc-900 bg-zinc-950"
                onMouseEnter={() => setIsHoveredProject(project.slug)}
                onMouseLeave={() => setIsHoveredProject(null)}
              >
                <div className="relative aspect-16/10 bg-zinc-900">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    className={`object-cover transition duration-500 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  <div
                    className={`absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/35 to-transparent p-6 transition duration-300 ${
                      isHovered
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <p className="text-sm font-medium text-zinc-300 uppercase">
                      {project.category}
                    </p>
                    <h2 className="mt-2 text-5xl font-medium tracking-tight text-white">
                      {project.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
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

      <div className="mt-20 flex justify-center">
        <Button label="Ver mais" onClick={() => {}}></Button>
      </div>
    </section>
  );
}
