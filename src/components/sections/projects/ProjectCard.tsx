'use client';

import Image from 'next/image';
import type { ProjectCardProps } from '@/types/projectCards';

const cardVariantStyles = {
  grid: {
    aspectRatio: '16 / 10',
    titleClass: 'mt-2 text-5xl font-medium tracking-tight text-white',
    widthClass: '',
  },
  reels: {
    aspectRatio: '9 / 16',
    titleClass: 'mt-2 text-3xl font-medium tracking-tight text-white',
    widthClass: 'w-72 min-w-72 shrink-0 sm:w-80 sm:min-w-80 md:w-96 md:min-w-96',
  },
} as const;

export default function ProjectCard({
  project,
  isHovered,
  variant = 'grid',
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const styles = cardVariantStyles[variant];

  return (
    <article
      className={`overflow-hidden rounded-4xl border border-zinc-900 bg-zinc-950 ${
        variant === 'reels' ? 'shrink-0' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`relative bg-zinc-900 ${styles.widthClass}`}
        style={{ aspectRatio: styles.aspectRatio }}
      >
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
          <h2 className={styles.titleClass}>{project.title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
            {project.summary}
          </p>
        </div>
      </div>
    </article>
  );
}
